import { useState, useEffect } from "react";
import {
  Form,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  GoPaperAirplane,
  GoPerson,
  GoHeart,
  GoComment,
  GoHeartFill,
  GoPlus,
} from "react-icons/go";
import AsyncSelect from "react-select/async";
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
    getChannelMessageFetchAPI();
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

function AddChannelMemberModal({
  setModalVisibility,
  getChannelDetailsFetchAPI,
}) {
  const [
    chatTarget,
    getMessageData,
    getMessageLoading,
    getMessageFetchAPI,
    getUsersData,
  ] = useOutletContext();
  const navigate = useNavigate();
  const [channelMember, setChannelMember] = useState("");
  const { id } = useParams();
  const options = getUsersData?.data?.flatMap((users) => [
    { value: users.id, label: users.email },
  ]);

  const {
    data: addChannelMemberData,
    loading: addChannelMemberLoading,
    fetchAPI: addChannelMemberFetchAPI,
  } = useFetch(`/channel/add_member`, {
    method: "POST",
    body: {
      id: `${id}`,
      member_id: channelMember?.value,
    },
  });

  function handleAddChannelMember(e) {
    e.preventDefault();
    addChannelMemberFetchAPI();
  }

  function handleDropdownChange(selectedOptions) {
    setChannelMember(selectedOptions);
  }

  function loadOptions(searchValue) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredOptions = options?.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        // console.log("loadOptions:", searchValue, filteredOptions);
        resolve(filteredOptions);
      }, 500);
    });
  }

  useEffect(() => {
    console.log(channelMember);
    console.log("add member", addChannelMemberData);
  }, [channelMember, addChannelMemberData]);

  useEffect(() => {
    if (!addChannelMemberLoading && addChannelMemberData) {
      if (!addChannelMemberData.errors) {
        toastSuccess(`Added ${channelMember.label} to the channel`);
        getChannelDetailsFetchAPI();
        setModalVisibility(false);
      } else {
        toastError(`${addChannelMemberData.errors}`);
      }
    }
  }, [addChannelMemberLoading, addChannelMemberData]);

  return (
    <>
      <section className="flex justify-center items-center w-full h-full p-4 bg-[#070707]">
        <form
          className="bg-[#313338] flex flex-col w-1/2 h-auto p-8 rounded-xl "
          onSubmit={handleAddChannelMember}
        >
          <h1 className="text-3xl text-center font-bold py-4">
            Add Channel Member
          </h1>
          <label htmlFor="channelMember" className="py-2">
            Select User
          </label>
          <AsyncSelect
            className="mb-4 text-black"
            loadOptions={loadOptions}
            // isMulti
            isClearable
            // defaultOptions
            value={channelMember}
            name="channelMember"
            id="channelMember"
            onChange={handleDropdownChange}
            placeholder="Add Channel Member"
          />
          <div className="flex justify-end gap-4 pt-4">
            <button
              className="bg-transparent rounded-lg h-12 p-2 px-6"
              onClick={() => setModalVisibility(false)}
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!channelMember}
              className={
                !channelMember
                  ? "bg-SlackGreen/[40%] rounded-lg h-12 p-2 px-6"
                  : "bg-SlackGreen rounded-lg h-12 p-2 px-6"
              }
            >
              Add Member
            </button>
          </div>
        </form>
      </section>
    </>
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

export function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-3xl">
      <GoComment className="text-9xl" /> Send your first chat
    </div>
  );
}

function ChannelMessageArea() {
  const [modalVisibility, setModalVisibility] = useState(false);
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

  // useEffect(() => {
  //   getChannelDetailsFetchAPI();
  // }, [getChannelMessageData]);

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
      {modalVisibility ? (
        <AddChannelMemberModal
          setModalVisibility={setModalVisibility}
          getChannelDetailsFetchAPI={getChannelDetailsFetchAPI}
        />
      ) : (
        <div className="p-4 w-full h-full">
          {!getChannelDetailsLoading && (
            <div
              id="message_details"
              className="flex items-center justify-between w-full h-[10%] p-4 bg-[#232428] text-3xl font-semibold text-ellipsis rounded-lg"
            >
              <div className="flex gap-2">
                <span>{getChannelDetailsData?.data?.name}</span>
                <div className="font-light text-gray-500 text-ellipsis">
                  {findUsers(getUsersData, getChannelMembers())}
                </div>
              </div>

              <div className="bg-[#2b2d31] p-2 rounded-lg">
                <GoPlus onClick={() => setModalVisibility(true)} />
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
                      user={trimEmail(data.sender.uid)}
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
      )}
    </>
  );
}

export default ChannelMessageArea;
