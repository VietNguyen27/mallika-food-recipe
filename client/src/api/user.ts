import request from './axios';
import { UpdateUserData } from '@pages/Profile/components/EditProfileDrawer';
import { SERVER_BASE_URL } from '@config/constants';

const USER_BASE_URL = `${SERVER_BASE_URL}/users`;

export const userApi = {
  getMe() {
    return request.get(`${USER_BASE_URL}/me`);
  },
  getById(id: string) {
    return request.get(`${USER_BASE_URL}/${id}`);
  },
  update(id: string, body: UpdateUserData) {
    return request.patch(`${USER_BASE_URL}/${id}`, body);
  },
  follow(id: string) {
    return request.post(`${USER_BASE_URL}/${id}/follow`);
  },
  unfollow(id: string) {
    return request.delete(`${USER_BASE_URL}/${id}/unfollow`);
  },
};
