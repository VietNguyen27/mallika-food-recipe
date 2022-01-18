import request from './axios';
import { URL_RECIPE_CREATE } from '@config/constants';
import { RecipeData } from '@features/recipe-slice';

export const recipeApi = {
  create(body: RecipeData) {
    return request.post(URL_RECIPE_CREATE, body);
  },
};
