import axios from 'axios';

// const BASE_URL = 'http://k6b203.p.ssafy.io';
const BASE_URL = 'http://k6b203.p.ssafy.io:8000';
// const BASE_URL = 'http://localhost:9000';
// const BASE_URL = 'http://localhost:8000';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
