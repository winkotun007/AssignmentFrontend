import { AxiosError, isAxiosError } from "axios";
import apiClient from "./axios";

const controller = async <T>(reqUrl: string, data?: T) => {
  const [methodType, urlName] = reqUrl.split(":");
  const url = JSON.parse(import.meta.env.VITE_API_BASE_URL);
  const bodyData = data;
  //const idToken = localStorage.getItem("****"); // from localstorage
  const idToken="sadfadsfd";
  try {
    const response = await apiClient({
      method: methodType,
      url: urlName,
      data: bodyData,
      baseURL: url, //https://localhost:6500/
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (!isAxiosError(err)) return;

    throw err.response?.data;
  }
};

export default controller;

