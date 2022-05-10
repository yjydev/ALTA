import { axiosInstance } from './index';

const makeHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'ACCESS_TOKEN': `Bearer ${localStorage.getItem('jwt')}`,
    },
  };
};

export const postRequest = async (url, body, headers = makeHeaders()) => {
  const response = await axiosInstance.post(url, body, headers);

  return response.data;
};

export const getRequest = async (url, headers = makeHeaders()) => {
  const response = await axiosInstance.get(url, headers);
  return response.data;
};

export const putRequest = async (url, body, headers = makeHeaders()) => {
  const response = await axiosInstance.put(url, body, headers);

  return response.data;
};

export const refreshToken = async () => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'ACCESS_TOKEN': `Bearer ${localStorage.getItem('jwt')}`,
      'REFRESH_TOKEN': `Bearer ${localStorage.getItem('refresh')}`,
    },
  };
  console.log(headers);

  const response = await axiosInstance.post('/api/jwt/issueAT', null, headers);

  return response.data;
};

export const deleteRequest = async (url, headers = makeHeaders()) => {
  const response = await axiosInstance.delete(url, headers);
  return response.data;
};
