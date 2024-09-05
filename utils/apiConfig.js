import axios from "axios";

const makeApiCall = async (method, data, content = "application/json") => {
  try {
    let token = null;
    if (typeof window !== "undefined") {
      token = sessionStorage.getItem("userToken");
    }

    const headers = {
      "Content-Type": content,
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    let body;

    body =
      content === "multipart/form-data"
        ? data.bodyData
        : JSON.stringify(data.bodyData);

    let response;

    switch (method) {
      case "GET":
        response = await axios.get(data?.url, { headers });
        break;
      case "POST":
        response = await axios.post(data?.url, body, { headers });
        break;
      case "PUT":
        response = await axios.put(data?.url, body, { headers });
        break;
      case "DELETE":
        response = await axios.delete(data?.url, { headers });
        break;
    }

    // const response = await fetch(data?.url, reqstValues);

    if (response.status === 401) {
      // Handle unauthorized access
      sessionStorage.clear();
    }

    if (response?.token) {
      sessionStorage.setItem("userToken", result?.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const doGetApiCall = (data) => makeApiCall("GET", data);
export const doPostApiCall = (data, content) =>
  makeApiCall("POST", data, content);
export const doDeleteApiCall = (data) => makeApiCall("DELETE", data);
export const doPutApiCall = (data) => makeApiCall("PUT", data);
