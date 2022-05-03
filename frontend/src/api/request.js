import { axiosInstance, headers } from './index';

export const postRequest = async (url, body) => {
  const response = await axiosInstance.post(url, body, headers);

  return response.data;
};

export const getRequest = async (url) => {
  console.log(headers.Authorization);
  const response = await axiosInstance.get(url, headers);

  return response.data;
};

export const putRequest = async (url, body) => {
  const response = await axiosInstance.put(url, body, headers);
  return response.data;
};
