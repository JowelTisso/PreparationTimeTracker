import axios from "axios";

export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const GET = async (url: string, token: string | null) => {
  try {
    let response;
    if (token) {
      const headers = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      };
      response = await axios.get(url, { headers });
    } else {
      response = await axios.get(url);
    }
    return response.data;
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
