import { axiosInstance, headers } from './index';

const makeHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'ACCESS_TOKEN': `Bearer ${localStorage.getItem('jwt')}`,
    },
  };
};

export const postRequest = async (url, body) => {
  const response = await axiosInstance.post(url, body, makeHeaders());

  return response.data;
};

export const getRequest = async (url) => {
  const response = await axiosInstance.get(url, makeHeaders());
  return response.data;
};

export const putRequest = async (url, body) => {
  const response = await axiosInstance.put(url, body, makeHeaders());

  return response.data;
};
