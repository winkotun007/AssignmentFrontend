import axios from 'axios';

const idToken = localStorage.getItem('TokenKey');

const fetchData = async (url: string, data: any) => {
  try {
    // Define headers with 'Content-Type' as required and 'Authorization' as optional
    const headers: { 'Content-Type': string; 'Authorization'?: string } = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header only if idToken is not null or empty
    if (idToken) {
      headers.Authorization = `Bearer ${idToken}`;
    }

    const response = await axios.post(url, data, {
      baseURL: 'https://localhost:7164/',
      headers: headers,
    });

    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error:', error);
    // Handle error if needed
    throw error; // Re-throw the error to indicate failure
  }
};

export default fetchData;
