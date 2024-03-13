import axios from 'axios';

const fetchData = async (url: string, data: any) => {
  try {
    const response = await axios.postForm(url, data, {
      baseURL: 'https://localhost:7164/',
      headers: {
        'Content-Type': 'application/json',
      },
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
