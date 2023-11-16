import { useEffect, useState } from "react";
import {
  toastError,
  getLocalStorage,
  setLocalStorage,
  toastInfo,
} from "../../../utils";
import { GoPlus, GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { Outlet, NavLink } from "react-router-dom";

function SideBar() {
  const [loading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState("");
  const [messageData, setMessageData] = useState("");
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [messageVisibility, setMessageVisibility] = useState(true);

  async function loadChannelData() {
    setLoading(true);
    const header_data = getLocalStorage("headerData");
    try {
      const response = await fetch("http://206.189.91.54/api/v1/channels", {
        method: "GET",
        headers: {
          "access-token": header_data["access-token"],
          client: header_data["client"],
          expiry: header_data["expiry"],
          uid: header_data["uid"],
        },
      });
      const channelData = await response.json();
      setChannelData(channelData);
      setLocalStorage("channelData", channelData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toastError(`${error}`);
    }
  }

  async function loadUserMessageData(id) {
    // setLoading(true);
    const header_data = getLocalStorage("headerData");
    try {
      const response = await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${id}&receiver_class=User`,
        {
          method: "GET",
          headers: {
            "access-token": header_data["access-token"],
            client: header_data["client"],
            expiry: header_data["expiry"],
            uid: header_data["uid"],
          },
        }
      );
      const messageData = await response.json();
      setMessageData(messageData);
      console.log("FETCHING");
      console.log(messageData);
      // toastInfo(messageData.data)
    } catch (error) {
      console.log(error);
      toastError(`${error}`);
    }
  }

  useEffect(() => {
    loadChannelData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-1/4 min-w-[250px] p-4 h-full bg-[#2b2d31]">
        <div className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2 py-2">
            <div
              onClick={() => setChannelVisibility(!channelVisibility)}
              className={
                channelVisibility
                  ? "transition-all ease-in duration-200"
                  : "transition-all -rotate-90 ease-in duration-200"
              }
            >
              {/* {channelVisibility ? <GoTriangleDown /> : <GoTriangleRight />} */}
              <GoTriangleDown />
            </div>
            <span>Channels</span>
          </div>
          <div>
            <GoPlus />
          </div>
        </div>

        {channelVisibility && (
          <div className="flex flex-col">
            <NavLink
              onClick={() => loadUserMessageData(4248)}
              className="pl-2 py-1 hover:bg-slate-400 rounded-lg w-full"
              key={4248}
            >
              <span>CYRIL</span>
            </NavLink>

            {(channelData.data || []).map((item, idx) => (
              <NavLink
                onClick={() => loadUserMessageData(item.id)}
                className="pl-2 py-1 hover:bg-slate-400 rounded-lg w-full"
                key={item.id}
              >
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2 py-4">
            <div onClick={() => setMessageVisibility(!messageVisibility)}>
              {messageVisibility ? <GoTriangleDown /> : <GoTriangleRight />}
            </div>
            <span>Direct Messages</span>
          </div>
          <div>
            <GoPlus />
          </div>
        </div>

        {messageVisibility && (
          <div className="flex flex-col">
            {(messageData.data || []).map((item, idx) => (
              <NavLink
                className="pl-2 py-1 hover:bg-slate-400 rounded-lg w-full"
                key={idx}
              >
                <span>{item.body}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Dashboard() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}

export default Dashboard;
