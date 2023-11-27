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
import {
  NavLink,
  Link,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PulseLoader } from "react-spinners";

function SideBarArea({
  loading,
  options,
  setOptions,
  globalOptions,
  getGlobalUsers,
  getGlobalUsersLoading,
  getGlobalUsersFetchAPI,
  getChannelData,
  getChannelLoading,
  getChannelFetchAPI,
  chatTarget,
  setChatTarget,
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
    if (!getGlobalUsersLoading && getGlobalUsers && !options) {
      const dropdown_options = getGlobalUsers.data.flatMap((users) => [
        { value: users.id, label: users.email },
      ]);
      setOptions(dropdown_options);
      // console.log(options);
    }
  }, [getGlobalUsers, getGlobalUsersLoading, options, setOptions]);

  useEffect(() => {
    if (!getChannelData) {
      getChannelFetchAPI();
    }
  }, [getChannelData, getChannelFetchAPI]);

  return (
    <>
      {!loading ? (
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
          {getChannelData ? (
            channelVisibility && (
              <div className="flex flex-col max-h-[30%] overflow-y-auto">
                {getChannelData?.data?.map((item) => (
                  <Link
                    className="pl-2 py-1 hover:bg-slate-400 rounded-lg w-full"
                    key={item.id}
                    to={`/app/c/${item.id}`}
                    onClick={() => {
                      setChatTarget("");
                    }}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <PulseLoader color="#36d7b7" />
          )}
          <div className="flex items-center justify-between text-xl">
            <div className="flex items-center gap-2 py-4">
              <div onClick={() => setMessageVisibility(!messageVisibility)}>
                <GoHash />
              </div>
              <span className="font-bold">Direct Messages</span>
            </div>
          </div>
          <Select
            className="text-black"
            options={globalOptions}
            isClearable
            // isDisabled={globalOptions}
            // cacheOptions
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
              <div
                onClick={() => setMessageVisibility(!messageVisibility)}
                className={
                  messageVisibility
                    ? "transition-all ease-in duration-200"
                    : "transition-all -rotate-90 ease-in duration-200"
                }
              >
                <GoTriangleDown />
              </div>
              <span className="font-bold">Recent Messages</span>
            </div>
          </div>
          {membersWithChatHistory ? (
            messageVisibility && (
              <div className="flex flex-col ">
                {membersWithChatHistory?.map((items, idx) => (
                  <Link
                    className="pl-2 py-1 hover:bg-slate-400 rounded-lg w-full"
                    key={idx}
                    to={`/app/t/${items.id}`}
                    onClick={() => {
                      setChatTarget("");
                    }}
                  >
                    {trimEmail(items.email)}
                  </Link>
                ))}
              </div>
            )
          ) : (
            <PulseLoader color="#36d7b7" />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col w-1/4 min-w-[250px] p-4 h-full bg-[#2b2d31]">
          <PulseLoader color="#36d7b7" />
        </div>
      )}
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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const header_data = getLocalStorage("headerData");
  const loginData = getLocalStorage("LoginData");

  const currentUserID = loginData.data.id;
  const token = header_data?.["access-token"];
  const client = header_data?.["client"];
  const expiry = header_data?.["expiry"];
  const uid = header_data?.["uid"];

  const {
    data: getChannelData,
    loading: getChannelLoading,
    fetchAPI: getChannelFetchAPI,
  } = useFetch("/channels", {
    method: "GET",
  });

  const {
    data: getGlobalUsersData,
    loading: getGlobalUsersLoading,
    fetchAPI: getGlobalUsersFetchAPI,
  } = useFetch("/users", {
    method: "GET",
  });

  useEffect(() => {
    if (!getGlobalUsersData) {
      getGlobalUsersFetchAPI();
    }
  }, []);

  useEffect(() => {
    getGlobalUsersFetchAPI();
  }, []);

  useEffect(() => {
    if (!globalOptions) {
      getAllChannelDetails();
      setGlobalOptions(findUsers(getGlobalUsersData, uniqueIDS));
    }
  }, [globalOptions]);

  useEffect(() => {
    if (getChannelData) {
      setLoading(true);
      getAllChannelDetails();
    }
  }, [getChannelData]);

  useEffect(() => {
    if (uniqueIDS) {
      getRecentMessages();
    }
  }, [uniqueIDS]);

  useEffect(() => {
    if (getGlobalUsersData) {
      setLoading(false);
      getAllChannelDetails();
    }
  }, [getGlobalUsersData]);

  function handleDropdownChange(selectedOptions) {
    setChatTarget(selectedOptions);
    if (!selectedOptions) {
      navigate(`/app`);
    } else {
      navigate(`/app/t/${selectedOptions.value}`);
    }
  }

  function findUsers(usersData, array) {
    const users = usersData?.data
      .filter((item) => array?.includes(item.id))
      .map((item) => ({ label: item.email, value: item.id }));

    return users;
  }

  async function getAllChannelDetails() {
    if (getChannelData) {
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
        const filteredMembers = await findUsers(
          getGlobalUsersData,
          uniqueUserIDs
        );
        setGlobalOptions(filteredMembers);
      } catch (error) {
        console.error(error);
      }
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
      // console.log("arrayOfPromises FOR MESSAGES", arrayOfPromises);
      const accumulatedPromise = await Promise.all(arrayOfPromises);
      // console.log("accumulatedPromise FOR MESSAGES", accumulatedPromise);

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
      // setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SideBarArea
        loading={loading}
        options={options}
        setOptions={setOptions}
        globalOptions={globalOptions}
        getUsersData={getGlobalUsersData}
        getUsersLoading={getGlobalUsersLoading}
        getUsersFetchAPI={getGlobalUsersFetchAPI}
        getChannelData={getChannelData}
        getChannelLoading={getChannelLoading}
        getChannelFetchAPI={getChannelFetchAPI}
        chatTarget={chatTarget}
        setChatTarget={setChatTarget}
        handleDropdownChange={handleDropdownChange}
        channelVisibility={channelVisibility}
        setChannelVisibility={setChannelVisibility}
        messageVisibility={messageVisibility}
        setMessageVisibility={setMessageVisibility}
        membersWithChatHistory={membersWithChatHistory}
      />
      <Outlet context={[chatTarget, getGlobalUsersData]} />
    </>
  );
}

export default Sidebar;
