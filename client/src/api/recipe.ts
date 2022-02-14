import request from './axios';
import { SERVER_BASE_URL } from '@config/constants';
import { RecipeData } from '@features/recipe-slice';

const RECIPES_BASE_URL = `${SERVER_BASE_URL}/recipes`;

export const recipeApi = {
  create(body: RecipeData) {
    return request.post(RECIPES_BASE_URL, body);
  },
  update(id: string, body) {
    return request.patch(`${RECIPES_BASE_URL}/${id}`, body);
  },
  like(id: string) {
    return request.patch(`${RECIPES_BASE_URL}/${id}/like`);
  },
  unlike(id: string) {
    return request.patch(`${RECIPES_BASE_URL}/${id}/unlike`);
  },
  getFeatured() {
    return request.get(`${RECIPES_BASE_URL}/featured`);
  },
  getByUserId(id, skip) {
    return request.get(`${RECIPES_BASE_URL}/user/${id}?skip=${skip}`);
  },
  getAll(skip) {
    return request.get(`${RECIPES_BASE_URL}/all?skip=${skip}`);
  },
  getById(id) {
    return request.get(`${RECIPES_BASE_URL}/${id}`);
  },
};
