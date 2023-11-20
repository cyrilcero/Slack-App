import { useContext, useEffect, useState } from "react";
import {
  useFetch,
  toastError,
  getLocalStorage,
  setLocalStorage,
} from "../../../utils";
import { GoPlus, GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import MessageArea from "./MessageArea";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

function SideBarArea({
  getUsersData,
  getUsersLoading,
  getUsersFetchAPI,
  options,
  setOptions,
  getChannelData,
  getChannelLoading,
  getChannelFetchAPI,
  chatTarget,
  setChatTarget,
  loadOptions,
  handleDropdownChange,
  channelVisibility,
  setChannelVisibility,
  messageVisibility,
  setMessageVisibility,
}) {
  // const [channelData, setChannelData] = useState("");
  const [messageData, setMessageData] = useState("");
  const animatedComponents = makeAnimated();
  const nav = useNavigate();

  useEffect(() => {
    if (!getUsersData) {
      getUsersFetchAPI();
    }
  }, []);

  useEffect(() => {
    if (!getUsersLoading && getUsersData && !options) {
      const dropdown_options = getUsersData.data.flatMap((users) => [
        { value: users.id, label: users.email },
      ]);
      setOptions(dropdown_options);
      console.log(options);
    }
  }, [getUsersData, getUsersLoading, options, setOptions]);

  useEffect(() => {
    if (!getChannelData) {
      console.log("CHANNEL");
      getChannelFetchAPI();
    }
  }, [getChannelData, getChannelFetchAPI]);

  useEffect(() => {
    console.log("CHAT TARGET", chatTarget);
  }, [chatTarget]);

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
          <div onClick={() => nav("create-channel")}>
            <GoPlus />
          </div>
        </div>

        {!getChannelLoading && getChannelData && (
          <div className="flex flex-col">
            <NavLink
              onClick={() => loadUserMessageData(4248)}
              className="pl-2 py-1 hover:bg-slate-400 rounded-lg w-full"
              key={4248}
            >
              <span>CYRIL</span>
            </NavLink>

            {getChannelData.data.map((item) => (
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
        <AsyncSelect
          className="mb-4 text-black"
          loadOptions={loadOptions}
          isClearable
          // defaultOptions
          value={chatTarget}
          components={animatedComponents}
          name="user_ids"
          id="user_ids"
          onChange={handleDropdownChange}
          placeholder="Select User"
        />
      </div>
    </>
  );
}

function Sidebar() {
  const {
    data: getChannelData,
    loading: getChannelLoading,
    fetchAPI: getChannelFetchAPI,
  } = useFetch("/channels", {
    method: "GET",
  });

  const {
    data: getUsersData,
    loading: getUsersLoading,
    fetchAPI: getUsersFetchAPI,
  } = useFetch("/users", {
    method: "GET",
  });
  const [options, setOptions] = useState(null);
  const [chatTarget, setChatTarget] = useState([]);
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [messageVisibility, setMessageVisibility] = useState(true);

  function loadOptions(searchValue) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredOptions = options.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        // console.log("loadOptions:", searchValue, filteredOptions);
        resolve(filteredOptions);
      }, 500);
    });
  }

  function handleDropdownChange(selectedOptions) {
    setChatTarget(selectedOptions);
  }

  return (
    <>
      <SideBarArea
        getUsersData={getUsersData}
        getUsersLoading={getUsersLoading}
        getUsersFetchAPI={getUsersFetchAPI}
        options={options}
        setOptions={setOptions}
        getChannelData={getChannelData}
        getChannelLoading={getChannelLoading}
        getChannelFetchAPI={getChannelFetchAPI}
        chatTarget={chatTarget}
        setChatTarget={setChatTarget}
        loadOptions={loadOptions}
        handleDropdownChange={handleDropdownChange}
        channelVisibility={channelVisibility}
        setChannelVisibility={setChannelVisibility}
        messageVisibility={messageVisibility}
        setMessageVisibility={setMessageVisibility}
      />
      <MessageArea chatTarget={chatTarget} />
    </>
  );
}

export default Sidebar;
