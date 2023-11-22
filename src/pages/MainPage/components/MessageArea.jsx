import { useState, useEffect } from "react";
import { Form, useOutletContext } from "react-router-dom";
import {
  GoPaperAirplane,
  GoPerson,
  GoHeart,
  GoThumbsdown,
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

function MessageInput({ chatTarget }) {
  const [chatData, setChatData] = useState("");
  const {
    data: sendChatData,
    loading: sendChatLoading,
    fetchAPI: sendChatFetchAPI,
  } = useFetch("/messages", {
    method: "POST",
    body: {
      receiver_id: chatTarget ? chatTarget.value : "",
      receiver_class: "User",
      body: chatData,
    },
  });
  function handleSubmit(e) {
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
    // window.location.reload();
  }

  useEffect(() => {
    console.log("CHAT TEXT", chatData);
    console.log("CHAT DATA", sendChatData);
    console.log("CHAT TARGET", chatTarget);
  }, [chatData, sendChatData, chatTarget]);

  useEffect(() => {
    if (sendChatData) {
      toastError(sendChatData.errors);
    } else {
      console.log("message sent");
    }
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
      <GoThumbsdown className="text-9xl" /> No chat selected
    </div>
  );
}

function MessageArea() {
  const [chatTarget, getMessageData, getMessageLoading, getMessageFetchAPI] =
    useOutletContext();
  const loginData = getLocalStorage("LoginData");
  const currentID = loginData.data.id;

  return (
    <>
      <div className="p-4 w-full h-full">
        <div
          id="message_details"
          className="flex items-center w-full h-[10%] p-4 bg-[#232428] text-3xl font-semibold text-ellipsis"
        >
          {!chatTarget ? "" : `${trimEmail(chatTarget.label || "")}`}
        </div>
        {!getMessageLoading && getMessageData && (
          <div className="flex flex-col-reverse w-full h-[80%] p-4 bg-[#313338] overflow-y-auto">
            {!chatTarget ? (
              <EmptyChat></EmptyChat>
            ) : (
              (getMessageData.data || [])
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

        <MessageInput chatTarget={chatTarget} />
      </div>
    </>
  );
}

export default MessageArea;
