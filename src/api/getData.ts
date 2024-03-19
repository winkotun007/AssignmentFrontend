import axios, { AxiosResponse } from "axios";
import { TApiResponse } from "../models";
import { endpoint } from "./enpoints";

// Define the interface for the response data


const getData = async <T>(url: string, requestData: any | null): Promise<TApiResponse<T>> => {
  try {

    const headers: { 'Content-Type': string; 'Authorization'?: string } = 
    {
     'Content-Type': 'application/json',
    };

    const idToken = localStorage.getItem('TokenKey');

    if (idToken) {
      headers.Authorization= `Bearer ${idToken}`;
    }

    const options: Record<string, any> = {
      // baseURL: 'http://47.128.148.50:80/',
      baseURL : endpoint.baseApiURL,
      headers: headers,
      data : requestData 
    };

    const response: AxiosResponse<TApiResponse<T>> = await axios.get(url, options);
  
    return {
      code: response.data.code,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default getData;
