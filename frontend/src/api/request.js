import { axiosInstance } from './index';

export const postRequest = async (url, body) => {
  console.log(url);
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'user_id': 2500,
    },
  };
  const response = await axiosInstance.post(url, body, headers);

  return response;
};
