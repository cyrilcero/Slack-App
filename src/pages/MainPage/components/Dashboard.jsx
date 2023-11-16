import { useEffect, useState } from "react";
import { toastError, getLocalStorage } from "../../../utils";
import { GoPlus, GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { Outlet, NavLink } from "react-router-dom";

function SideBar() {
  const [loading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState("");
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [directMessageVisibility, setDirectMessageVisibility] = useState(true);

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
      setLoading(false);
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
            {(channelData.data || []).map((item, idx) => (
              <NavLink
                className="pl-2 py-1 hover:bg-slate-400 rounded-lg w-full"
                key={idx}
              >
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2 py-4">
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
          <div>
            <GoPlus />
          </div>
        </div>
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
