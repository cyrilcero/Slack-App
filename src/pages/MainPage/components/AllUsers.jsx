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

  return (
    <>
      <div onClick={loadData}>TESTING</div>
      <table className="overflow-y-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email Address</th>
          </tr>
        </thead>
        {data && (
          <tbody>
            {data.data.map((user, idx) => (
              <tr key={idx}>
                <td>{user.id}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}
