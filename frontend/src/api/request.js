import { axiosInstance } from './index';

export const postRequest = async (url, body) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'user_id': 2500,
    },
  };
  const response = await axiosInstance.post(url, body, headers);

  return response.data;
};

export const getRequest = async (url) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'user_id': 2500,
    },
  };
  const response = await axiosInstance.get(url, headers);

  return response.data;
};
