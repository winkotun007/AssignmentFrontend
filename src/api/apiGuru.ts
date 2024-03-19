import axios, {AxiosResponse } from "axios";
import { TApiResponse } from "~/models";
import apiClient from "./axios";
export * from "../api/enpoints";

const controller = async <T>(
  method: 'get' | 'post' | 'delete' | 'put',
  reqUrl: string,
  data?: any
): Promise<TApiResponse<T>> => {
  try {
    const idToken = localStorage.getItem('TokenKey');

    // const apiBaseUrl = "http://47.128.148.50:80/";

    const apiBaseUrl = "https://localhost:7164/";
    // const response: AxiosResponse<TApiResponse<T>> = await apiClient({
    //   method: method,
    //   url: reqUrl,
    //   data: data,
    //   baseURL: apiBaseUrl,
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${idToken}`,
    //   },
    // });

    const headers: { 'Content-Type': string; 'Authorization'?: string } = 
                    {
                     'Content-Type': 'application/json',
                    };

    if (idToken) {
      headers.Authorization = `Bearer ${idToken}`;
    }

    if(method == 'post')
    {
      const response = await axios.post(apiBaseUrl+reqUrl, data, {
        headers: headers
      });
      console.log('Post Res');
      console.log(response);
      return {
        code: response.data.code,
        message: response.data.message,
        data: response.data.data,
      };
  
  
    }
    else(method=='get')
    {
      const response: AxiosResponse<TApiResponse<T>> = await apiClient({
        method: method,
        url: reqUrl,
        data: data,
        baseURL: apiBaseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
      });
      
     // const response: AxiosResponse<TApiResponse<T>> = await axios.get(reqUrl, options);
      console.log('GET');
      console.log(response);
      return {
        code: response.data.code,
        message: response.data.message,
        data: response.data.data,
      };
    }

    return {
      code : 400,
      message : "Error",
      data : data
    }
 
  } catch (error) {
    throw error;
  }
};

export default controller;
