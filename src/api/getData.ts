import axios, { AxiosResponse } from "axios";

// Define a generic type for your API response
type TApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

// Define the generic getData function
const getData = async <T>(url: string): Promise<TApiResponse<T>> => {
  try {
    const response: AxiosResponse<TApiResponse<T>> = await axios.get(url,
        {
            baseURL: 'https://localhost:7164/',
            headers: {
            'Content-Type': 'application/json',
            },
        });
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
