import { useState } from "react";
import { getLocalStorage, toastError } from "utils";

export function useFetch(url, config) {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchAPI() {
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
        body: config.body ? JSON.stringify(config.body) : null,
      });
      setResponse(response);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      toastError(`${error}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, setData, response, error, loading, fetchAPI };
}

export function useIndividualFetch() {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function individualFetchAPI(url, config) {
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
        body: config.body ? JSON.stringify(config.body) : null,
      });
      if (response === 200) {
        setResponse(response);
        const data = await response.json();
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      toastError(`${error}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, setData, response, error, loading, individualFetchAPI };
}
