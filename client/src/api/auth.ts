import request from './axios';
import { AUTH_REGISTER_URL, AUTH_LOGIN_URL } from '@config/constants';
import { LoginData } from '@pages/Auth/Login';
import { RegisterData } from '@pages/Auth/Register';

export const authApi = {
  register(body: RegisterData) {
    return request.post(AUTH_REGISTER_URL, body);
  },
  login(body: LoginData) {
    return request.post(AUTH_LOGIN_URL, body);
  },
};
