import request from './axios';
import {
  CREATE_RECIPE_URL,
  GET_FEATURED_RECIPES_URL,
  GET_MY_RECIPES_URL,
  GET_ALL_RECIPES_URL,
  GET_MORE_RECIPES_URL,
  UPDATE_RECIPE_URL,
  LIKE_RECIPE_URL,
  UNLIKE_RECIPE_URL,
  GET_RECIPE_BY_ID_URL,
} from '@config/constants';
import { RecipeData } from '@features/recipe-slice';

export const recipeApi = {
  create(body: RecipeData) {
    return request.post(CREATE_RECIPE_URL, body);
  },
  update(id: string, body) {
    return request.patch(`${UPDATE_RECIPE_URL}/${id}`, body);
  },
  like(id: string) {
    return request.patch(`${LIKE_RECIPE_URL}/${id}`);
  },
  unlike(id: string) {
    return request.patch(`${UNLIKE_RECIPE_URL}/${id}`);
  },
  getFeatured() {
    return request.get(GET_FEATURED_RECIPES_URL);
  },
  getMine() {
    return request.get(GET_MY_RECIPES_URL);
  },
  getAll() {
    return request.get(GET_ALL_RECIPES_URL);
  },
  getMore(skip) {
    return request.get(`${GET_MORE_RECIPES_URL}?skip=${skip}`);
  },
  getById(id) {
    return request.get(`${GET_RECIPE_BY_ID_URL}/${id}`);
  },
};
