import request from './axios';
import { SERVER_BASE_URL } from '@config/constants';

const SEARCH_BASE_URL = `${SERVER_BASE_URL}/search`;

export const searchApi = {
  findRecipesByTitle(title, skip, config) {
    return request.get(
      `${SEARCH_BASE_URL}?title=${title}&skip=${skip}`,
      config
    );
  },
  findRecipesByIngredient(ingredient, skip, config) {
    return request.get(
      `${SEARCH_BASE_URL}?ingredient=${ingredient}&skip=${skip}`,
      config
    );
  },
  findUsersByNameOrEmail(user, skip, config) {
    return request.get(`${SEARCH_BASE_URL}?user=${user}&skip=${skip}`, config);
  },
};
