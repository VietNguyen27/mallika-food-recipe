import request from './axios';
import { SERVER_BASE_URL } from '@config/constants';

const REVIEW_BASE_URL = `${SERVER_BASE_URL}/recipes`;

export const reviewApi = {
  getAll(recipeId) {
    return request.get(`${REVIEW_BASE_URL}/${recipeId}/reviews/all`);
  },
  getMore(recipeId, skip) {
    return request.get(
      `${REVIEW_BASE_URL}/${recipeId}/reviews/more?skip=${skip}`
    );
  },
  create(recipeId, body) {
    return request.post(`${REVIEW_BASE_URL}/${recipeId}/reviews`, body);
  },
  update(recipeId, reviewId, body) {
    return request.patch(
      `${REVIEW_BASE_URL}/${recipeId}/reviews/${reviewId}`,
      body
    );
  },
  delete(recipeId, reviewId) {
    return request.delete(`${REVIEW_BASE_URL}/${recipeId}/reviews/${reviewId}`);
  },
};
