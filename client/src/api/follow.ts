import request from './axios';
import { SERVER_BASE_URL } from '@config/constants';

const FOLLOW_BASE_URL = `${SERVER_BASE_URL}/users`;

export const followApi = {
  getFollowers(id, skip) {
    return request.get(`${FOLLOW_BASE_URL}/${id}/followers?skip=${skip}`);
  },
  getFollowing(id, skip) {
    return request.get(`${FOLLOW_BASE_URL}/${id}/following?skip=${skip}`);
  },
};
