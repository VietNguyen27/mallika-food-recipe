import request from './axios';
import { SEARCH_URL } from '@config/constants';

export const searchApi = {
  getRecipesByTitle(title, skip) {
    return request.get(`${SEARCH_URL}?title=${title}&skip=${skip}`);
  },
  getRecipesByIngredient(ingredient, skip) {
    return request.get(`${SEARCH_URL}?ingredient=${ingredient}&skip=${skip}`);
  },
  getUsersByNameOrEmail(user, skip) {
    return request.get(`${SEARCH_URL}?user=${user}&skip=${skip}`);
  },
};
