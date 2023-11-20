import { useState } from "react";
import { getLocalStorage } from "utils";

export function useFetch() {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchAPI(url, config) {
    setLoading(true);
    const header_data = getLocalStorage("headerData");
    const token = header_data?.["access-token"];
    const client = header_data?.["client"];
    const expiry = header_data?.["expiry"];
    const uid = header_data?.["uid"];
    const API_URL = "http://206.189.91.54/api/v1" + url;
    try {
      const response = await fetch(API_URL, {
        method: config.method,
        headers: {
          ...config.header,
          "Content-Type": "application/json",
          "access-token": token,
          client: client,
          expiry: expiry,
          uid: uid,
        },
        body: JSON.stringify(config.body || ""),
      });
      setResponse(response);
      const data = await response.json();
      setData(data);

      console.log("RES", response);
      console.log("DATA", response);

      setLoading(false);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, response, error, loading, fetchAPI };
}
