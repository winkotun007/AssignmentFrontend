import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";
  
  const apiClient = axios.create();
  
  const onRequest = async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    // config.baseURL = import.meta.env.VITE_API_BASE_URL;
    return config;
  };
  
  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };
  
  const onResponse = (res: AxiosResponse): AxiosResponse => {
    return res;
  };
  
  const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };
  
  apiClient.interceptors.request.use(onRequest, onRequestError);
  apiClient.interceptors.response.use(onResponse, onResponseError);
  
  export default apiClient;
  