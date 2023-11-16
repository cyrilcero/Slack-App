import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { getLocalStorage, toastError, toastSuccess } from "../../../utils";

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
        const dropdown_options = data.data.flatMap((users) => [
          { value: users.id, label: users.email },
        ]);
        setOptions(dropdown_options);
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
    console.log("Channel Name:", channelName);
    console.log("Channel Members:", channelMembers);
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

  function flatten(targetArray) {
    return targetArray.map((item) => item.value);
  }

  async function handleCreateChannelSubmit() {
    const header_data = getLocalStorage("headerData");
    const members = flatten(channelMembers);
    try {
      const response = await fetch("http://206.189.91.54/api/v1/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": header_data["access-token"],
          client: header_data["client"],
          expiry: header_data["expiry"],
          uid: header_data["uid"],
        },
        body: JSON.stringify({
          name: channelName,
          user_ids: members,
        }),
      });
      // console.log(body);
      console.log("RES", response);
      const data = await response.json();
      console.log("DATA", data);

      setChannelName("");
      setChannelMembers([]);

      /**
       * TODO: data.errors
       * "Name can't be blank"
       * "Name is too short (minimum is 3 characters)"
       */
      toastSuccess(`Channel ${channelName} created successfully`);
    } catch (error) {
      console.error(error);
      toastError(`${error}`);
    }
  }

  if (!loading) {
    return (
      <div className="flex flex-col w-full h-screen m-4 justify-center items-center">
        <Form
          onSubmit={handleCreateChannelSubmit}
          className="flex flex-col w-1/2 h-auto bg-[#070707] p-8 rounded-xl "
        >
          <h1 className="text-3xl text-center font-bold py-4">
            Create New Channel
          </h1>
          <label className="py-2">Channel Name</label>
          <input
            name="channelName"
            type="text"
            placeholder="new-channel"
            className="bg-white rounded-[4px] p-3 h-[38px] text-slate-950 mb-4"
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
            value={channelMembers}
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
        </Form>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <BarLoader color="#2EB67D" />
    </div>
  );
}

export default CreateChannel;
