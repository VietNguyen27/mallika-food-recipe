import request from './axios';
import { SERVER_BASE_URL } from '@config/constants';

const LIKED_BASE_URL = `${SERVER_BASE_URL}/liked`;

export const likedApi = {
  create(body) {
    return request.post(LIKED_BASE_URL, body);
  },
  remove(id) {
    return request.delete(`${LIKED_BASE_URL}/${id}`);
  },
  getAll(skip) {
    return request.get(`${LIKED_BASE_URL}/all?skip=${skip}`);
  },
};
