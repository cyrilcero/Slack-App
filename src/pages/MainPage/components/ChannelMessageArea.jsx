import { useState, useEffect } from "react";
import { Form, useOutletContext, useParams } from "react-router-dom";
import {
  GoPaperAirplane,
  GoPerson,
  GoHeart,
  GoComment,
  GoHeartFill,
  GoPlus,
} from "react-icons/go";
import {
  getLocalStorage,
  useFetch,
  trimEmail,
  formatDate,
  toastError,
  toastSuccess,
} from "../../../utils";

function MessageInput({ chatTarget, getChannelMessageFetchAPI }) {
  const [chatData, setChatData] = useState("");
  const {
    data: sendChatData,
    loading: sendChatLoading,
    fetchAPI: sendChatFetchAPI,
  } = useFetch("/messages", {
    method: "POST",
    body: {
      receiver_id: chatTarget ? chatTarget : "",
      receiver_class: "Channel",
      body: chatData,
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (chatTarget == false) {
      toastError("Receipient Missing!");
    } else if (!chatData) {
      toastError("Message Missing!");
    } else {
      sendChatFetchAPI();
      setChatData("");
      toastSuccess("Message sent!");
    }
  }

  //   useEffect(() => {
  //     if (sendChatData) {
  //       toastError(sendChatData.errors);
  //     } else {
  //       console.log("message sent");
  //     }
  //   }, [sendChatData]);

  // run fetch para magbago yung state during loading state
  useEffect(() => {
    if (sendChatLoading) {
      getChannelMessageFetchAPI();
    }
  }, [sendChatLoading]);

  return (
    <Form
      className="flex gap-4 w-full h-[10%] bg-[#313338] p-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="chat"
        className="h-full w-full bg-[#383a40] rounded-xl p-4 text-slate-50"
        value={chatData}
        onChange={(e) => setChatData(e.target.value)}
      />
      <button
        type="submit"
        disabled={!chatData}
        className={
          !chatData
            ? "flex justify-center items-center w-[20%] h-full bg-SlackGreen/[40%] rounded-lg text-h1"
            : "flex justify-center items-center w-[20%] h-full bg-SlackGreen rounded-lg text-h1"
        }
      >
        <GoPaperAirplane />
      </button>
    </Form>
  );
}

function Message({ user, message, time, sender }) {
  const [heartVisibility, setHeartVisibility] = useState(true);
  return (
    <div
      className={
        sender === true
          ? "flex items-center w-full"
          : "flex items-center justify-end w-full "
      }
    >
      <div className="flex items-center w-1/2 h-auto">
        <GoPerson className="min-w-[50px] min-h-[50px] aspect-square rounded-full bg-slate-700" />
        <div className="flex flex-col justify-center p-4">
          <div className="flex">
            <span className="font-bold pr-2">{user}</span>
            <span className="font-light text-slate-50/50">{time}</span>
          </div>
          <span>{message}</span>
        </div>
        <div
          className="min-w-[20px]"
          onClick={() => setHeartVisibility(!heartVisibility)}
        >
          {heartVisibility ? <GoHeart /> : <GoHeartFill />}
        </div>
      </div>
    </div>
  );
}

export function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-3xl">
      <GoComment className="text-9xl" /> Send your first chat
    </div>
  );
}

function ChannelMessageArea() {
  const loginData = getLocalStorage("LoginData");
  const currentID = loginData.data.id;
  const [
    chatTarget,
    getMessageData,
    getMessageLoading,
    getMessageFetchAPI,
    getUsersData,
  ] = useOutletContext();
  const { id } = useParams();
  const {
    data: getChannelMessageData,
    loading: getChannelMessageLoading,
    fetchAPI: getChannelMessageFetchAPI,
  } = useFetch(`/messages?receiver_id=${id}&receiver_class=Channel`, {
    method: "GET",
  });
  const {
    data: getChannelDetailsData,
    loading: getChannelDetailsLoading,
    fetchAPI: getChannelDetailsFetchAPI,
  } = useFetch(`/channels/${id}`, {
    method: "GET",
  });

  useEffect(() => {
    getChannelMessageFetchAPI();
    getChannelDetailsFetchAPI();
  }, [id]);

  //   useEffect(() => {
  //     console.log(getChannelMessageData);
  //   }, [getChannelMessageData]);

  function getChannelMembers() {
    const members = getChannelDetailsData?.data?.channel_members?.map(
      (member) => member.user_id
    );
    return members;
  }

  function findUsers(usersData, array) {
    const users = usersData?.data
      .filter((item) => array?.includes(item.id))
      .map((item) => trimEmail(item.email))
      .join(", ");

    return users;
  }

  return (
    <>
      <div className="p-4 w-full h-full">
        {!getChannelDetailsLoading && (
          <div
            id="message_details"
            className="flex items-center justify-between w-full h-[10%] p-4 bg-[#232428] text-3xl font-semibold text-ellipsis"
          >
            <div className="flex gap-2">
              <span>{getChannelDetailsData?.data?.name}</span>
              <div className="font-light">
                {findUsers(getUsersData, getChannelMembers())}
              </div>
            </div>

            <div className="bg-[#2b2d31] p-2 rounded-lg">
              <GoPlus />
            </div>
          </div>
        )}
        {!getChannelMessageLoading && getChannelMessageData && (
          <div className="flex flex-col-reverse w-full h-[80%] p-4 bg-[#313338] overflow-y-auto">
            {getChannelMessageData.data.length === 0 ? (
              <EmptyChat></EmptyChat>
            ) : (
              (getChannelMessageData?.data || [])
                .toReversed()
                .map((data, idx) => (
                  <Message
                    key={idx}
                    message={data.body}
                    time={formatDate(data.created_at)}
                    user={data.sender.uid}
                    sender={currentID === data.sender.id ? false : true}
                  />
                ))
            )}
          </div>
        )}

        <MessageInput
          chatTarget={id}
          getChannelMessageFetchAPI={getChannelMessageFetchAPI}
        />
      </div>
    </>
  );
}

export default ChannelMessageArea;
