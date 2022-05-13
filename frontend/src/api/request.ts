import { axiosInstance } from './index';

type HeaderType = {
  headers: {
    'Content-Type': string;
    'ACCESS_TOKEN': string;
  };
};

const makeHeaders = (): HeaderType => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'ACCESS_TOKEN': `Bearer ${localStorage.getItem('jwt')}`,
    },
  };
};

export const postRequest = async (url: string, body: any, headers = makeHeaders()): Promise<any> => {
  const response = await axiosInstance.post(url, body, headers);

  return response.data;
};

export const getRequest = async (url: string, headers = makeHeaders()): Promise<any> => {
  const response = await axiosInstance.get(url, headers);
  return response.data;
};

export const putRequest = async (url: string, body: any, headers = makeHeaders()): Promise<any> => {
  const response = await axiosInstance.put(url, body, headers);

  return response.data;
};

export const refreshToken = async (): Promise<any> => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'ACCESS_TOKEN': `Bearer ${localStorage.getItem('jwt')}`,
      'REFRESH_TOKEN': `Bearer ${localStorage.getItem('refresh')}`,
    },
  };
  const response = await axiosInstance.post('/api/jwt/issueAT', null, headers);

  return response.data;
};

export const deleteRequest = async (url: string, headers = makeHeaders()): Promise<any> => {
  const response = await axiosInstance.delete(url, headers);
  return response.data;
};
