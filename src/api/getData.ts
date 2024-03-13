import axios, { AxiosResponse } from "axios";

// Define a generic type for your API response
type TApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

// Define the generic getData function
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

const idToken = localStorage.getItem('TokenKey');
export default getData(idToken);
