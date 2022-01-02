import { RegisterData } from '@pages/Auth/Register';
import request from './axios';
import {
  URL_AUTH_REGISTER,
  URL_AUTH_LOGIN,
  URL_USER_ME,
} from '@config/constants';
import { LoginData } from '@pages/Auth/Login';

export const authApi = {
  register(body: RegisterData) {
    return request.post(URL_AUTH_REGISTER, body);
  },
  login(body: LoginData) {
    return request.post(URL_AUTH_LOGIN, body);
  },
  fetch(token: string) {
    return request.get(URL_USER_ME, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
  },
};
