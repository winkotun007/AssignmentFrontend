import controller from "~/api";
import { endpoint } from "~/api/enpoints";

export const postLogin = async <D>(postData: D) => {
  return await controller(`${endpoint.login}`, postData);
};

export const postLogout = async () => {
  return await controller(`${endpoint.logout}`);
};
