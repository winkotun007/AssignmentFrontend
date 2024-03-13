import axios, { AxiosResponse } from "axios";

type TApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

const getData = async <T>(url: string, idToken?: string): Promise<TApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header only if idToken is provided
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }

    const response: AxiosResponse<TApiResponse<T>> = await axios.get(url, {
      baseURL: 'https://localhost:7164/',
      headers: headers,
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
