import { axiosInstance, headers } from './index';

export const postRequest = async (url, body) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'user_id': 2500,
      'Authorization':
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5MjI1MzEyNyIsImlhdCI6MTY1MTU1NTQ3OCwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1MjE2MDI3OH0.0g3oPKgAMxdEwphWqvNVDjT4QSuqiTwgtEA5oqFqnEakxS1DXmD9USxx8cGzW-1N40Nk-ouOkdWJJgrGOlQHsA',
    },
  };
  const response = await axiosInstance.post(url, body, headers);

  return response.data;
};

export const getRequest = async (url) => {
  const response = await axiosInstance.get(url, headers);
  return response.data;
};

export const putRequest = async (url, body) => {
  const response = await axiosInstance.put(url, body, headers);

  return response.data;
};
