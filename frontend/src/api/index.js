import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = 'http://localhost:8000';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
