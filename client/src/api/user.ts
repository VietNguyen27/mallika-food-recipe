import request from './axios';
import { GET_OTHER_USER_URL } from '@config/constants';

export const userApi = {
  fetchById(id) {
    return request.get(`${GET_OTHER_USER_URL}/${id}`);
  },
};
