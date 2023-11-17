import React, { useState } from "react";
import { Form } from "react-router-dom";
import {
  GoPaperAirplane,
  GoPerson,
  GoHeart,
  GoHeartFill,
} from "react-icons/go";

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

function Message({ user, message, time }) {
  const [heartVisibility, setHeartVisibility] = useState(true);
  return (
    <div className="flex items-center w-full h-16">
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

function MessageArea() {
  return (
    <>
      <div className="p-4 w-full h-full">
        <div id="message_details" className="w-full h-[10%] p-4 bg-[#232428]">
          MESSAGE DETAILS
        </div>
        <div className="flex flex-col-reverse w-full h-[80%] p-4 bg-[#313338] gap-2">
          <Message user={"CyrilCero"} message="lorem" time={"12:00:01PM"} />
          <Message user={"CyrilCero"} message="test" time={"12:00:01PM"} />
          <Message
            user={"User 1234"}
            message="Meron akong Chikaaaa"
            time={"12:00:02PM"}
          />
        </div>
        <MessageInput />
      </div>
    </>
  );
}

export default MessageArea;
