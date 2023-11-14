import React from "react";
import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../../../utils/localstorage";
import { toastError, toastSuccess } from "../../../utils/toasts";

function AllUsers() {
  return <AllUsersTable />;
}

export default AllUsers;

function AllUsersTable() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  async function loadData() {
    const header_data = getLocalStorage("headerData");
    console.log(header_data);
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
      setData(data);
      setLocalStorage("allUsers", data);
      toastSuccess("Data Retrieved");
    } catch (error) {
      setError(error);
      toastError("Login Unsuccessful");
    }
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data) {
    const sortedData = data.data.sort((a, b) => a.id - b.id);
    return (
      <div className="w-1/2">
        <table className="w-full">
          <thead className="w-full bg-slate-500">
            <tr className="text-center">
              <th>ID</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody className="w-full text-center">
            {sortedData.map((user) => (
              <tr key={user.id} className="even:bg-slate-700 text-center">
                <td>{user.id}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <div className="text-center" onClick={loadData}>
        CLICK ME TO GENERATE TABLE
      </div>
    </>
  );
}
