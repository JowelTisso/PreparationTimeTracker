import axios from "axios";

export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const getCurrentDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const date = new Date();
  return date.toLocaleDateString("en-US", options);
};

export const GET = async (url: string, enableToken: boolean = false) => {
  try {
    let response;
    if (enableToken) {
      const token = getFromLocalStorage("token");
      if (token) {
        const headers = {
          Authorization: `Bearer ${JSON.parse(token)}`,
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
  } catch (error) {
    console.error(error);
  }
};

export const POST = async (url: string, data: any) => {
  try {
    const token = getFromLocalStorage("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }
    const headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
