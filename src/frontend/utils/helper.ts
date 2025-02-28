import axios from "axios";

export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getCurrentDate = () => {
  const date = new Date();
  return date.setHours(0, 0, 0, 0);
};

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const dateString = date.toLocaleDateString("en-GB", options);
  return dateString;
};

export const GET = async (url: string, enableToken: boolean = false) => {
  try {
    let response;
    if (enableToken) {
      const tokenData = getLocalStorage("tokenData");
      if (tokenData) {
        const headers = {
          Authorization: `Bearer ${JSON.parse(tokenData).token}`,
          "Content-Type": "application/json",
        };
        response = await axios.get(url, { headers });
      } else {
        response = null;
      }
    } else {
      response = await axios.get(url);
    }
    return response?.data;
  } catch (e: any) {
    if (e?.status === 401) {
      clearLocalStorage();
    }
    throw e;
  }
};

export const POST = async (url: string, data: any) => {
  try {
    const tokenData = getLocalStorage("tokenData");
    if (!tokenData) {
      throw new Error("No token found in local storage");
    }
    const headers = {
      Authorization: `Bearer ${JSON.parse(tokenData).token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (e: any) {
    if (e?.status === 401) {
      clearLocalStorage();
    }
    console.error(e);
  }
};
