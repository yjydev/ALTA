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
      // 'Authorization':
      //   'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1MzM0OTI4NCIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NTE0NzUxNzJ9.6PuGwFJIkwZcKSmHQ-KYDpQrwJiTnKY0LRvPfTpl_LsmG3qnTDJ3x3fTam-ZymaOpsKuwQ2WYheE-udhBSw8ag',
    },
  };
  const response = await axiosInstance.get(url, headers);

  return response.data;
};

export const putRequest = async (url, body) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'user_id': 2500,
      // 'Authorization':
      //   'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1MzM0OTI4NCIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NTE0NzUxNzJ9.6PuGwFJIkwZcKSmHQ-KYDpQrwJiTnKY0LRvPfTpl_LsmG3qnTDJ3x3fTam-ZymaOpsKuwQ2WYheE-udhBSw8ag',
    },
  };
  const response = await axiosInstance.put(url, body, headers);
  return response.data;
};
