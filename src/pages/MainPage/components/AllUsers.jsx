import { useState, useEffect } from "react";
import { toastError, getLocalStorage } from "../../../utils";
import BarLoader from "react-spinners/BarLoader";

function AllUsers() {
  return <AllUsersTable />;
}

export default AllUsers;

function AllUsersTable() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    setLoading(true);
    const header_data = getLocalStorage("headerData");
    console.log(header_data);
    try {
      const response = await fetch("http://206.189.91.54/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": header_data["access-token"],
          client: header_data["client"],
          expiry: header_data["expiry"],
          uid: header_data["uid"],
        },
      });
      console.log("RES", response);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      toastError("Login Unsuccessful");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!data) {
      loadData();
    }
  });

  if (data) {
    const sortedData = data.data.sort((a, b) => a.id - b.id);
    return (
      <div>
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <BarLoader color="#50b57f" width={400} />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <table className="w-full border">
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
        )}
      </div>
    );
  }
}
