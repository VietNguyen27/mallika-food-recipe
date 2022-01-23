import request from './axios';
import {
  ADD_LIKED_RECIPE_URL,
  GET_ALL_LIKED_RECIPE_URL,
  GET_MORE_LIKED_RECIPE_URL,
  REMOVE_LIKED_RECIPE_URL,
} from '@config/constants';

export const likedApi = {
  create(body) {
    return request.post(ADD_LIKED_RECIPE_URL, body);
  },
  remove(id) {
    return request.delete(`${REMOVE_LIKED_RECIPE_URL}/${id}`);
  },
  getAll() {
    return request.get(GET_ALL_LIKED_RECIPE_URL);
  },
  getMore(skip) {
    return request.get(`${GET_MORE_LIKED_RECIPE_URL}?skip=${skip}`);
  },
};
