import request from './axios';
import {
  GET_ALL_REVIEWS_URL,
  ADD_NEW_REVIEW_URL,
  UPDATE_REVIEW_URL,
  DELETE_REVIEW_URL,
} from '@config/constants';

export const reviewApi = {
  getAll(recipeId) {
    return request.get(`${GET_ALL_REVIEWS_URL}/${recipeId}/reviews/all`);
  },
  getMore(recipeId, skip) {
    return request.get(
      `${GET_ALL_REVIEWS_URL}/${recipeId}/reviews/more?skip=${skip}`
    );
  },
  create(recipeId, body) {
    return request.post(`${ADD_NEW_REVIEW_URL}/${recipeId}/reviews`, body);
  },
  update(recipeId, reviewId, body) {
    return request.patch(
      `${UPDATE_REVIEW_URL}/${recipeId}/reviews/${reviewId}`,
      body
    );
  },
  delete(recipeId, reviewId) {
    return request.delete(
      `${DELETE_REVIEW_URL}/${recipeId}/reviews/${reviewId}`
    );
  },
};
