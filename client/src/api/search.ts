import request from './axios';
import { SERVER_BASE_URL } from '@config/constants';

const SEARCH_BASE_URL = `${SERVER_BASE_URL}/search`;

export const searchApi = {
  getRecipesByTitle(title, skip, config) {
    return request.get(
      `${SEARCH_BASE_URL}?title=${title}&skip=${skip}`,
      config
    );
  },
  getRecipesByIngredient(ingredient, skip, config) {
    return request.get(
      `${SEARCH_BASE_URL}?ingredient=${ingredient}&skip=${skip}`,
      config
    );
  },
  getUsersByNameOrEmail(user, skip, config) {
    return request.get(`${SEARCH_BASE_URL}?user=${user}&skip=${skip}`, config);
  },
};
