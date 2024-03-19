import axios, { AxiosResponse } from 'axios';
import { IDModel, TApiResponse } from '../models';
import { endpoint } from './enpoints';

const idToken = localStorage.getItem('TokenKey');

const deleteData = async (url: string,Id : string) => {
  try {
    const headers: { 'Authorization'?: string } = {};
    if (idToken) {
      headers.Authorization = `Bearer ${idToken}`;
    }
    const requestData : IDModel = {Id : Id};
    
    const response: AxiosResponse<TApiResponse<null>> = await axios.delete(url, {
      baseURL: endpoint.baseApiURL,
      headers: headers,
      data : requestData
    });
    return response.data; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};

export default deleteData;
