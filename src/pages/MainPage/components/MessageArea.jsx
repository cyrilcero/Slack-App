import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import {
  GoPaperAirplane,
  GoPerson,
  GoHeart,
  GoHeartFill,
} from "react-icons/go";
import { getLocalStorage, useFetch } from "../../../utils";

function MessageInput() {
  return (
    <Form className="flex gap-4 w-full h-[10%] bg-[#313338] p-4">
      <input
        type="text"
        name="chat"
        className="h-full w-full bg-[#383a40] rounded-xl p-4 text-slate-50"
      />
      <button
        type="submit"
        className="flex justify-center items-center w-[20%] h-full bg-SlackGreen rounded-lg text-h1"
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
          ? "flex items-center w-full h-16"
          : "flex items-center justify-end w-full h-16"
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
      <div onClick={() => setHeartVisibility(!heartVisibility)}>
        {heartVisibility ? <GoHeart /> : <GoHeartFill />}
      </div>
    </div>
  );
}

function MessageArea({
  chatTarget,
  getMessageData,
  getMessageLoading,
  getMessageFetchAPI,
}) {
  // useEffect(() => {
  //   console.log("CHAT TARGET", chatTarget);
  //   console.log("MESSAGE DATA", getMessageData);
  // }, [chatTarget, getMessageData]);
  const loginData = getLocalStorage("LoginData");
  const currentID = loginData.data.id;
  return (
    <>
      <div className="p-4 w-full h-full">
        <div id="message_details" className="w-full h-[10%] p-4 bg-[#232428]">
          {!chatTarget ? "" : `${chatTarget.label} `}
        </div>
        {!getMessageLoading && getMessageData && (
          <div className="flex flex-col-reverse w-full h-[80%] p-4 bg-[#313338] gap-2">
            {!getMessageLoading &&
              (getMessageData.data || [])
                .toReversed()
                .map((data) => (
                  <Message
                    key={data.id}
                    message={data.body}
                    time={data.created_at}
                    user={data.sender.uid}
                    sender={currentID === data.sender.id ? false : true}
                  />
                ))}
          </div>
        )}

        <MessageInput />
      </div>
    </>
  );
}

export default MessageArea;
