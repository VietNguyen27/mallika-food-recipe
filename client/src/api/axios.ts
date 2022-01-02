import axios from 'axios';
import queryString from 'query-string';
import { SERVER_BASE_URL } from '@config/constant';

const request = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default request;
