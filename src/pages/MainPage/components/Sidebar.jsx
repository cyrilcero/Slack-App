import { useEffect, useState } from "react";
import {
  useFetch,
  useIndividualFetch,
  getLocalStorage,
  trimEmail,
} from "../../../utils";
import {
  GoPlus,
  GoHash,
  GoTriangleDown,
  GoTriangleRight,
} from "react-icons/go";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
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
  membersWithChatHistory,
}) {
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
      // console.log(options);
    }
  }, [getUsersData, getUsersLoading, options, setOptions]);

  useEffect(() => {
    if (!getChannelData) {
      getChannelFetchAPI();
    }
  }, [getChannelData, getChannelFetchAPI]);

  // useEffect(() => {
  //   console.log("CHANNEL DATA", getChannelData);
  // }, [getChannelData]);

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
              <GoTriangleDown />
            </div>
            <span className="font-bold">Channels</span>
          </div>
          <div onClick={() => nav("create-channel")}>
            <GoPlus />
          </div>
        </div>

        {!getChannelLoading && getChannelData && channelVisibility && (
          <div className="flex flex-col max-h-[30%] overflow-y-auto">
            {getChannelData?.data?.map((item) => (
              <NavLink
                className="pl-2 py-1 hover:bg-slate-400 rounded-lg w-full"
                key={item.id}
                to={`/app/c/${item.id}`}
                onClick={() => {
                  setChatTarget("");
                }}
              >
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2 py-4">
            <div onClick={() => setMessageVisibility(!messageVisibility)}>
              <GoHash />
            </div>
            <span className="font-bold">Direct Messages</span>
          </div>
        </div>

        <AsyncSelect
          className="text-black"
          loadOptions={loadOptions}
          isClearable
          cacheOptions
          // defaultOptions
          value={chatTarget}
          components={animatedComponents}
          name="user_ids"
          id="user_ids"
          onChange={handleDropdownChange}
          placeholder="Select User"
        />

        <div className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2 py-4">
            <div onClick={() => setMessageVisibility(!messageVisibility)}>
              {messageVisibility ? <GoTriangleDown /> : <GoTriangleRight />}
            </div>
            <span className="font-bold">Recent Messages</span>
          </div>
        </div>
        <div className="flex flex-col">
          {membersWithChatHistory?.map((items, idx) => (
            <NavLink key={idx} to={`/app/t/${items.id}`}>
              {trimEmail(items.email)}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  const [options, setOptions] = useState(null);
  const [chatTarget, setChatTarget] = useState([]);
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [messageVisibility, setMessageVisibility] = useState(true);
  const [uniqueIDS, setUniqueIDS] = useState(null);
  const [globalOptions, setGlobalOptions] = useState(null);
  const [membersWithChatHistory, setMembersWithChatHistory] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
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

  const {
    data: getMessageData,
    loading: getMessageLoading,
    fetchAPI: getMessageFetchAPI,
  } = useFetch(
    `/messages?receiver_id=${chatTarget && id ? id : ""}&receiver_class=User`,
    {
      method: "GET",
    }
  );

  function loadOptions(searchValue) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredOptions = options?.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        resolve(filteredOptions);
      }, 500);
    });
  }

  useEffect(() => {
    console.log("MD", getMessageData);
    console.log("TARGET", chatTarget);
  }, [getMessageData, chatTarget]);

  useEffect(() => {
    if (chatTarget) {
      console.log("AFTER APICALL", getMessageData);
      getMessageFetchAPI();
    }
  }, [chatTarget]);

  function handleDropdownChange(selectedOptions) {
    setChatTarget(selectedOptions);
    if (!selectedOptions) {
      navigate(`/app`);
    } else {
      navigate(`/app/t/${selectedOptions.value}`);
    }
  }

  // console.log("ALL CHANNELS", allChannels);
  // const {
  //   data: getChannelDetailsData,
  //   individualFetchAPI: getChannelDetailsFetchAPI,
  // } = useIndividualFetch();

  // const [memberData, setMemberData] = useState([]);

  // async function getAllMembers() {
  //   const allChannels = getChannelData.data.map((channel) => channel.id);
  //   allChannels.forEach((item) => {
  //     getChannelDetailsFetchAPI(`/channels/${item}`, { method: "GET" });

  //     console.log("CH data", getChannelDetailsData);

  //     if (getChannelDetailsData) {
  //       setMemberData((prev) => ({
  //         ...prev,
  //         getChannelDetailsData,
  //       }));

  //     }
  //     console.log("MEM DATA", memberData);
  //   });
  //   return memberData;
  // }

  // async function arrayMembers() {
  //   const member = await getAllMembers();
  // console.log("MEMBER DATA", member);
  // const memberIDS = memberData.map((mem) => mem.data.id);
  // console.log("IDS", memberIDS);
  // return memberIDS;
  // }

  // useEffect(() => {
  //   if (getChannelData) {
  //     arrayMembers();
  //   }
  // }, []);

  function findUsers(usersData, array) {
    const users = usersData?.data
      .filter((item) => array?.includes(item.id))
      .map((item) => ({ label: item.email, value: item.id }));

    return users;
  }

  const header_data = getLocalStorage("headerData");
  const loginData = getLocalStorage("LoginData");
  const currentUserID = loginData.data.id;
  const currentUserEmail = loginData.data.email;
  const token = header_data?.["access-token"];
  const client = header_data?.["client"];
  const expiry = header_data?.["expiry"];
  const uid = header_data?.["uid"];

  async function getAllChannelDetails() {
    const allChannelID = getChannelData.data.map((channel) => channel.id);
    try {
      const arrayOfPromises = allChannelID.map(async (id) => {
        const response = await fetch(
          `http://206.189.91.54/api/v1/channels/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "access-token": token,
              client: client,
              expiry: expiry,
              uid: uid,
            },
          }
        );
        const data = await response.json();
        return data;
      });
      const accumulatedPromise = await Promise.all(arrayOfPromises);
      const allUserIDS = accumulatedPromise.map((item) =>
        item.data.channel_members.map((member) => member.user_id)
      );
      const flattenedAllUserIDS = allUserIDS.flat();
      const uniqueUserIDsSet = new Set(flattenedAllUserIDS);
      const uniqueUserIDs = Array.from(uniqueUserIDsSet);

      setUniqueIDS(uniqueUserIDs);
      console.log(uniqueUserIDs);

      findUsers(getUsersData, uniqueUserIDs);

      const filteredMembers = findUsers(getUsersData, uniqueUserIDs);
      setGlobalOptions(filteredMembers);
      console.log(filteredMembers);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRecentMessages() {
    // replace allChannelID to uniqueIDS
    try {
      const arrayOfPromises = uniqueIDS.map(async (id) => {
        const response = await fetch(
          `http://206.189.91.54/api/v1/messages?receiver_id=${id}&receiver_class=User`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "access-token": token,
              client: client,
              expiry: expiry,
              uid: uid,
            },
          }
        );
        const data = await response.json();
        return data;
      });
      console.log("arrayOfPromises FOR MESSAGES", arrayOfPromises);
      const accumulatedPromise = await Promise.all(arrayOfPromises);
      console.log("accumulatedPromise FOR MESSAGES", accumulatedPromise);

      const withHistory = accumulatedPromise
        .filter((item) => item.data.length > 0)
        .map((item) => {
          return item.data[0].sender.id !== currentUserID
            ? { id: item.data[0].sender.id, email: item.data[0].sender.email }
            : {
                id: item.data[0].receiver.id,
                email: item.data[0].receiver.email,
              };
        });
      setMembersWithChatHistory(withHistory);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (getChannelData) {
      getAllChannelDetails();
    }
  }, []);

  useEffect(() => {
    if (uniqueIDS) {
      getRecentMessages();
    }
  }, []);

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
        getMessageData={getMessageData}
        getMessageLoading={getMessageLoading}
        getMessageFetchAPI={getMessageFetchAPI}
        membersWithChatHistory={membersWithChatHistory}
      />
      <Outlet
        context={[
          chatTarget,
          getMessageData,
          getMessageLoading,
          getMessageFetchAPI,
          getUsersData,
        ]}
      />
    </>
  );
}

export default Sidebar;
