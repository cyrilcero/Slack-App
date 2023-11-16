import { useEffect, useState } from "react";
import { toastSuccess, toastError, getLocalStorage } from "../../../utils";
import { GoPlus, GoTriangleDown, GoTriangleRight } from "react-icons/go";

function SideBar() {
  const [loading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState("");
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [directMessageVisibility, setDirectMessageVisibility] = useState(true);

  useEffect(() => {
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
        console.log("RES", response);
        const channelData = await response.json();
        setChannelData(channelData);
        console.log("DATA", channelData);
        toastSuccess("Loaded Channels");
        setLoading(false);
      } catch (error) {
        console.log(error);
        toastError("error");
      }
    }
    loadChannelData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-1/4 min-w-[250px] p-4 h-full bg-[#2b2d31]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div onClick={() => setChannelVisibility(!channelVisibility)}>
              {channelVisibility ? <GoTriangleDown /> : <GoTriangleRight />}
            </div>
            <span>Channels</span>
          </div>
          <GoPlus />
        </div>
        {channelVisibility && (
          <div className="">
            {!loading && (
              <ul>
                {(channelData.data || []).map((item, idx) => (
                  <li
                    className="pl-2 py-1 hover:bg-slate-400 roudned-md w-full"
                    key={idx}
                  >
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              onClick={() =>
                setDirectMessageVisibility(!directMessageVisibility)
              }
            >
              {directMessageVisibility ? (
                <GoTriangleDown />
              ) : (
                <GoTriangleRight />
              )}
            </div>
            <span>Direct Messages</span>
          </div>
          <GoPlus />
        </div>
      </div>
    </>
  );
}

function Dashboard() {
  return (
    <>
      <SideBar />
      <div className="main w-full">
        <ul className="w-full text-center font-extrabold text-3xl p-4">
          THINGS TO DO
          <div className="text-2xl text-left font-normal">
            <li className="text-blue-500">LOGIN/SIGNUP THINGS</li>
            <li className="line-through text-green-400">
              User is able to create his/her account with email and password
            </li>
            <li className="line-through text-green-400">
              User is able to login his/her credentials
            </li>
            <li className="text-blue-500">SIDEBAR THINGS</li>
            <li>
              ADD TOOLTIP ON HOVER
              https://www.flowbite-react.com/docs/components/tooltip
            </li>
            <li className="text-blue-500">CHANNEL THINGS</li>
            <li className="line-through text-green-400">
              User is able to create new channel
            </li>
            <li className="line-through text-green-400">
              User is able to add users on a channel
            </li>
            <li className="line-through text-green-400">
              User is able to SEE all channels
            </li>
            <li className="line-through text-green-400">
              Process flow: Click "+" then redirect, 1 input:name 1
              select:members 1 btn create channel, toast success then reload
              sidebar to show new channels
            </li>
            <li className="text-blue-500">MESSAGE THINGS</li>
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
