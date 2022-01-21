import request from './axios';
import {
  URL_RECIPE_CREATE,
  URL_FEATURED_RECIPES,
  URL_MY_RECIPES,
} from '@config/constants';
import { RecipeData } from '@features/recipe-slice';

export const recipeApi = {
  create(body: RecipeData) {
    return request.post(URL_RECIPE_CREATE, body);
  },
  getFeatured() {
    return request.get(URL_FEATURED_RECIPES);
  },
  getMine() {
    return request.get(URL_MY_RECIPES);
  },
};
