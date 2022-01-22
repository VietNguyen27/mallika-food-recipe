import request from './axios';
import {
  AUTH_REGISTER_URL,
  AUTH_LOGIN_URL,
  GET_USER_URL,
  UPDATE_USER_URL,
} from '@config/constants';
import { LoginData } from '@pages/Auth/Login';
import { RegisterData } from '@pages/Auth/Register';
import { UpdateUserData } from '@pages/Profile/components/EditProfileDrawer';

export const authApi = {
  register(body: RegisterData) {
    return request.post(AUTH_REGISTER_URL, body);
  },
  login(body: LoginData) {
    return request.post(AUTH_LOGIN_URL, body);
  },
  fetch() {
    return request.get(GET_USER_URL);
  },
  update(id: string, body: UpdateUserData) {
    return request.patch(`${UPDATE_USER_URL}/${id}`, body);
  },
};
