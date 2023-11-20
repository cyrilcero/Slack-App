import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

import {
  useFetch,
  getLocalStorage,
  toastError,
  toastSuccess,
} from "../../../utils";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [channelMembers, setChannelMembers] = useState([]);
  const { data, response, error, loading, fetchAPI } = useFetch();
  const [options, setOptions] = useState(null);
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  async function loadData() {
    const url = "/users";
    const config = {
      method: "GET",
    };
    fetchAPI(url, config);
  }

  useEffect(() => {
    loadData();
    // console.log("API CALL DONE");
  }, []);

  useEffect(() => {
    if (data) {
      const dropdown_options = data.data.flatMap((users) => [
        { value: users.id, label: users.email },
      ]);
      setOptions(dropdown_options);
    }
  }, []);

  function handleInputChange(e) {
    setChannelName(e.target.value);
  }

  function handleDropdownChange(selectedOptions) {
    setChannelMembers(selectedOptions);
  }

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

  async function handleCreateChannelSubmit() {
    const url = "/channels";
    const config = {
      method: "POST",
      body: {
        name: channelName,
        user_ids: channelMembers.map((item) => item.value),
      },
    };
    fetchAPI(url, config);

    //   if (data.errors) {
    //     throw data.errors[0];
    //   } else {
    //     toastSuccess(`Channel ${channelName} created successfully`);
    //     navigate("/app");
    //   }
  }

  if (!loading) {
    return (
      <div className="flex flex-col w-full h-full m-4 justify-center items-center">
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
          <label className="py-2" htmlFor="user_ids">
            Select Channel Members - You can select multiple
          </label>

          <AsyncSelect
            className="mb-4 text-black"
            loadOptions={loadOptions}
            isMulti
            isClearable
            // defaultOptions
            value={channelMembers}
            components={animatedComponents}
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
