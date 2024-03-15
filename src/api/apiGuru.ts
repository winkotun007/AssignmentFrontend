import axios, {AxiosResponse } from "axios";
import { TApiResponse } from "~/models";
export * from "../api/enpoints";

const controller = async <T>(
  method: 'get' | 'post' | 'delete' | 'put',
  reqUrl: string,
  data?: any
): Promise<TApiResponse<T>> => {
  try {
    const idToken = localStorage.getItem('TokenKey');
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

    const response = await axios.post(apiBaseUrl+reqUrl, data, {
      headers: headers
    });

    console.log(response);
    return {
      code: response.data.code,
      message: response.data.message,
      data: response.data.data,
    };


    if(method=='post')
    {
       const response: AxiosResponse<TApiResponse<T>> = await axios.post (reqUrl, data, {
        baseURL: 'https://localhost:7164/',
        headers: headers,
        method : method
      });
      console.log('POST');
      console.log(response);
      return {
        code: response.data.code,
        message: response.data.message,
        data: response.data.data,
      };
    }
    else(method=='get')
    {
      const options: Record<string, any> = {
        baseURL: 'https://localhost:7164/',
        headers: headers,
        data : data  ,
        method : method
      };
      
      const response: AxiosResponse<TApiResponse<T>> = await axios.get(reqUrl, options);
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
