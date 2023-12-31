import { useState, useEffect } from "react";
import { Form, useOutletContext, useParams } from "react-router-dom";
import {
  GoPaperAirplane,
  GoPerson,
  GoHeart,
  GoHubot,
  GoHeartFill,
} from "react-icons/go";
import {
  getLocalStorage,
  useFetch,
  trimEmail,
  formatDate,
  toastError,
  toastSuccess,
} from "../../../utils";
import { PulseLoader } from "react-spinners";
import { EmptyChat } from "./ChannelMessageArea";

function MessageInput({ getMessageFetchAPI }) {
  const [chatData, setChatData] = useState("");
  const { id } = useParams();

  const {
    data: sendChatData,
    loading: sendChatLoading,
    fetchAPI: sendChatFetchAPI,
  } = useFetch("/messages", {
    method: "POST",
    body: {
      receiver_id: id,
      receiver_class: "User",
      body: chatData,
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (id == false) {
      toastError("Recipient Missing!");
    } else if (!chatData) {
      toastError("Message Missing!");
    } else {
      sendChatFetchAPI();
      setChatData("");
      toastSuccess("Message sent!");
      setTimeout(getMessageFetchAPI, 200);
    }
  }

  // useEffect(() => {
  //   getMessageFetchAPI();
  // }, [sendChatLoading]);

  useEffect(() => {
    if (sendChatData) {
      toastError(sendChatData.errors);
    }
    // else {
    //   console.log("message sent");
    // }
  }, [sendChatData]);

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
      <div
        className={
          sender === true
            ? "flex items-center w-1/2 h-auto"
            : "flex items-center justify-end w-1/2 h-auto"
        }
      >
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

export function NoSelectedChat() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-3xl">
      <GoHubot className="text-9xl" /> Welcome to SlaCord!
    </div>
  );
}

function MessageArea() {
  const [chatTarget, getUsersData] = useOutletContext();
  const { id } = useParams();
  const {
    data: getMessageData,
    loading: getMessageLoading,
    fetchAPI: getMessageFetchAPI,
  } = useFetch(`/messages?receiver_id=${id}&receiver_class=User`, {
    method: "GET",
  });

  const loginData = getLocalStorage("LoginData");
  const currentID = loginData.data.id;

  function findUser(target) {
    return getUsersData?.data?.find((user) => user.id === target);
  }
  const userData = findUser(Number(id));

  useEffect(() => {
    getMessageFetchAPI();
  }, [id]);

  return (
    <>
      <div className="p-4 w-full h-full">
        <div
          id="message_details"
          className="flex items-center w-full h-[10%] p-4 bg-[#232428] text-3xl font-semibold text-ellipsis rounded-lg"
        >
          {getUsersData ? (
            <span>{trimEmail(userData?.uid)}</span>
          ) : (
            <PulseLoader color="#36d7b7" />
          )}
        </div>

        {
          getMessageData && (
            <div className="flex flex-col-reverse w-full h-[80%] p-4 bg-[#313338] overflow-y-auto">
              {!id && getMessageData.data ? (
                <NoSelectedChat></NoSelectedChat>
              ) : getMessageData.data.length === 0 ? (
                <EmptyChat />
              ) : (
                getMessageData?.data
                  .toReversed()
                  .map((data, idx) => (
                    <Message
                      key={idx}
                      message={data.body}
                      time={formatDate(data.created_at)}
                      user={trimEmail(data.sender.uid)}
                      sender={currentID === data.sender.id ? false : true}
                    />
                  ))
              )}
            </div>
          )
          // : (
          //   <PulseLoader color="#36d7b7" />
          // )
        }
        {getMessageData && (
          <MessageInput
            chatTarget={id}
            getMessageFetchAPI={getMessageFetchAPI}
          />
        )}
      </div>
    </>
  );
}

export default MessageArea;
