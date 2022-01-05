import axios from 'axios';
import queryString from 'query-string';
import { SERVER_BASE_URL } from '@config/constants';

const request = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

request.interceptors.request.use(async (config) => {
  const customHeaders: any = {};

  const accessToken = localStorage.getItem('token');
  if (accessToken) {
    customHeaders.Authorization = 'Bearer ' + accessToken;
  }

  return {
    ...config,
    headers: {
      ...customHeaders,
      ...config.headers,
    },
  };
});

export default request;
