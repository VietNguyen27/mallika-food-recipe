import request from './axios';
import {
  CREATE_RECIPE_URL,
  GET_FEATURED_RECIPES_URL,
  GET_MY_RECIPES_URL,
  GET_ALL_RECIPES_URL,
  GET_MORE_RECIPES_URL,
} from '@config/constants';
import { RecipeData } from '@features/recipe-slice';

export const recipeApi = {
  create(body: RecipeData) {
    return request.post(CREATE_RECIPE_URL, body);
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
};
