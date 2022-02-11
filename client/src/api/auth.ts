import request from './axios';
import { SERVER_BASE_URL } from '@config/constants';
import { LoginData } from '@pages/Auth/Login';
import { RegisterData } from '@pages/Auth/Register';

const AUTH_BASE_URL = `${SERVER_BASE_URL}/auth`;

export const authApi = {
  register(body: RegisterData) {
    return request.post(`${AUTH_BASE_URL}/register`, body);
  },
  login(body: LoginData) {
    return request.post(`${AUTH_BASE_URL}/login`, body);
  },
};
