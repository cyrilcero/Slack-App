import { useState } from "react";
import Select from "react-select";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");

  const options = [
    { value: "testing", label: "testing" },
    { value: "testing1", label: "testing1" },
    { value: "testing2", label: "testing2" },
    { value: "testing3", label: "testing3" },
    { value: "testing4", label: "testing4" },
    { value: "testing5", label: "testing5" },
  ];

  return (
    <>
      <div className="flex flex-col w-full h-auto bg-slate-900 p-4 rounded-xl">
        <h1 className="text-3xl text-center font-bold">Create New Channel</h1>
        <label>Channel Name</label>
        <input></input>
        <label>Select Channel Members</label>
        <Select
          options={options}
          isMulti={true}
          placeholder="Add Members"
        ></Select>
        <div className="flex justify-end gap-4 py-4">
          <button className="bg-SlackGreen rounded-lg h-12 p-2 px-6">
            Create Channel
          </button>
          <button className="bg-SlackRed rounded-lg h-12 p-2 px-6">
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateChannel;
