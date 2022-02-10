import request from './axios';
import {
  FOLLOW_USER_URL,
  GET_OTHER_USER_URL,
  GET_USER_URL,
  UNFOLLOW_USER_URL,
  UPDATE_USER_URL,
} from '@config/constants';
import { UpdateUserData } from '@pages/Profile/components/EditProfileDrawer';

export const userApi = {
  fetch() {
    return request.get(GET_USER_URL);
  },
  fetchById(id: string) {
    return request.get(`${GET_OTHER_USER_URL}/${id}`);
  },
  update(id: string, body: UpdateUserData) {
    return request.patch(`${UPDATE_USER_URL}/${id}`, body);
  },
  follow(id: string) {
    return request.post(`${FOLLOW_USER_URL}/${id}/follow`);
  },
  unfollow(id: string) {
    return request.delete(`${UNFOLLOW_USER_URL}/${id}/unfollow`);
  },
};
