import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { getLocalStorage } from "../../../utils/localstorage";
import { toastError, toastSuccess } from "../../../utils/toasts";

//overlay 070707
// body 313338
// footer/ button div bg 2b2d31

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [channelMembers, setChannelMembers] = useState([]);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const header_data = getLocalStorage("headerData");
      try {
        const response = await fetch("http://206.189.91.54/api/v1/users", {
          method: "GET",
          headers: {
            "access-token": header_data["access-token"],
            client: header_data["client"],
            expiry: header_data["expiry"],
            uid: header_data["uid"],
          },
        });
        console.log("RES", response);
        const data = await response.json();
        const dropdown_options = data.data.map((users) => [
          { value: users.id, label: users.email },
        ]);
        const dropdown_options_flat = dropdown_options.flat();
        setOptions(dropdown_options_flat);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toastError("error");
      }
    }
    if (options === null) {
      loadData();
    }

    // console.log(options);
    console.log(channelName);
    console.log(channelMembers);
  }, [channelMembers, channelName, options]);

  // const option = [
  //   { value: 1, label: "testing" },
  //   { value: 2, label: "testing1" },
  //   { value: 3, label: "testing2" },
  //   { value: 4, label: "testing3" },
  //   { value: 5, label: "testing4" },
  //   { value: 6, label: "testing5" },
  // ];

  function handleInputChange(e) {
    setChannelName(e.target.value);
  }

  function handleDropdownChange(selectedOptions) {
    setChannelMembers(selectedOptions);
  }

  if (!loading) {
    return (
      <div className="flex flex-col w-full h-screen m-4 justify-center items-center">
        <div className="flex flex-col w-1/2 h-auto bg-[#070707] p-8 rounded-xl ">
          <h1 className="text-3xl text-center font-bold py-4">
            Create New Channel
          </h1>
          <label className="py-2">Channel Name</label>
          <input
            name="channelName"
            type="text"
            className="bg-white rounded-[4px] p-2 h-[38px] text-slate-950 mb-4"
            value={channelName}
            onChange={handleInputChange}
          ></input>
          <label className="py-2">
            Select Channel Members - You can select multiple
          </label>

          <Select
            className="mb-4 text-black"
            options={options}
            isMulti
            isClearable
            components={animatedComponents}
            loadingMessage={"loading"}
            name="user_ids"
            onChange={handleDropdownChange}
            placeholder="Add Members"
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              className="bg-transparent rounded-lg h-12 p-2 px-6"
              onClick={() => navigate("/app")}
            >
              Close
            </button>
            <button
              disabled={!channelName}
              className={
                !channelName
                  ? "bg-SlackGreen/[40%] rounded-lg h-12 p-2 px-6"
                  : "bg-SlackGreen rounded-lg h-12 p-2 px-6"
              }
            >
              Create Channel
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <BarLoader />
    </div>
  );
}

export default CreateChannel;
