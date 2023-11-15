import React from "react";

function Dashboard() {
  return (
    <>
      <div className="messaging-bar flex flex-col w-1/4 p-4 h-full bg-[#2b2d31]">
        SELECT USER NA I-CHACHAT
        <ul>
          {" "}
          Place Users Here
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul>
      </div>
      <div className="main w-full">
        <ul className="w-full text-center font-extrabold text-3xl p-4">
          THINGS TO DO
          <div className="text-2xl text-left font-normal">
            <li className="text-green-400">LOGIN/SIGNUP THINGS</li>
            <li className="line-through text-red-400">
              User is able to create his/her account with email and password
            </li>
            <li className="line-through text-red-400">
              User is able to login his/her credentials
            </li>
            <li className="text-green-400">SIDEBAR THINGS</li>
            <li>
              ADD TOOLTIP ON HOVER
              https://www.flowbite-react.com/docs/components/tooltip
            </li>
            <li className="text-green-400">CHANNEL THINGS</li>
            <li className="text-orange-400">
              User is able to create new channel
            </li>
            <li className="text-orange-400">
              User is able to add users on a channel
            </li>
            <li>
              Process flow: Click "+" then redirect, 1 input:name 1
              select:members 1 btn create channel, toast success then reload
              sidebar to show new channels
            </li>
            <li className="text-green-400">MESSAGE THINGS</li>
            <li>User is able to send message to other user (Direct message)</li>
            <li>User is able to send message to a channel</li>
            <li>
              User is able to receive message from other user (Direct message)
            </li>
            <li>User is able to receive message from his/her channels</li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Dashboard;
