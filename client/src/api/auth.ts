import request from './axios';
import {
  URL_AUTH_REGISTER,
  URL_AUTH_LOGIN,
  URL_USER_ME,
  URL_USER_UPDATE,
} from '@config/constants';
import { LoginData } from '@pages/Auth/Login';
import { RegisterData } from '@pages/Auth/Register';
import { UpdateUserData } from '@pages/Profile/components/EditProfileDrawer';

export const authApi = {
  register(body: RegisterData) {
    return request.post(URL_AUTH_REGISTER, body);
  },
  login(body: LoginData) {
    return request.post(URL_AUTH_LOGIN, body);
  },
  fetch() {
    return request.get(URL_USER_ME);
  },
  update(id: string, body: UpdateUserData) {
    return request.patch(`${URL_USER_UPDATE}/${id}`, body);
  },
};
