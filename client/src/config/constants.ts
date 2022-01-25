export const SERVER_BASE_URL = 'http://localhost:5000/api';
export const AUTH_REGISTER_URL = `${SERVER_BASE_URL}/auth/register`;
export const AUTH_LOGIN_URL = `${SERVER_BASE_URL}/auth/login`;

export const GET_USER_URL = `${SERVER_BASE_URL}/users/me`;
export const UPDATE_USER_URL = `${SERVER_BASE_URL}/users`;

export const CREATE_RECIPE_URL = `${SERVER_BASE_URL}/recipes`;
export const UPDATE_RECIPE_URL = `${SERVER_BASE_URL}/recipes`;
export const LIKE_RECIPE_URL = `${SERVER_BASE_URL}/recipes/like`;
export const UNLIKE_RECIPE_URL = `${SERVER_BASE_URL}/recipes/unlike`;
export const GET_FEATURED_RECIPES_URL = `${SERVER_BASE_URL}/recipes/featured`;
export const GET_MY_RECIPES_URL = `${SERVER_BASE_URL}/recipes/me`;
export const GET_ALL_RECIPES_URL = `${SERVER_BASE_URL}/recipes/all`;
export const GET_MORE_RECIPES_URL = `${SERVER_BASE_URL}/recipes/more`;
export const GET_RECIPE_BY_ID_URL = `${SERVER_BASE_URL}/recipes`;

export const ADD_LIKED_RECIPE_URL = `${SERVER_BASE_URL}/liked`;
export const REMOVE_LIKED_RECIPE_URL = `${SERVER_BASE_URL}/liked`;
export const GET_ALL_LIKED_RECIPE_URL = `${SERVER_BASE_URL}/liked/all`;
export const GET_MORE_LIKED_RECIPE_URL = `${SERVER_BASE_URL}/liked/more`;

export const SEARCH_URL = `${SERVER_BASE_URL}/search`;

export const MINIMUM_SEARCH_DELAY = 500;
export const MINIMUM_LOADER_DELAY = 500;
export const MINIMUM_AUTH_DELAY = 1000;

export const TOAST_VISIBLE_TIME = 2500;
export const TOAST_EXPIRED_TIME = 3500;

export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 3600;
export const SECONDS_PER_DAY = 86400;
export const SECONDS_PER_MONTH = 2592000;
export const SECONDS_PER_YEAR = 31536000;

export const UPWARDS = 'upwards';
export const DOWNWARDS = 'downwards';

export const PENDING = 'pending';
export const FULFILLED = 'fulfilled';
export const REJECTED = 'rejected';
