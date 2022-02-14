import { createSlice } from '@reduxjs/toolkit';
import { capitalizeFirstLetter } from '@helpers/helpers';
import {
  isSomeAsyncActionsFulfilled,
  isSomeAsyncActionsPending,
  isSomeAsyncActionsRejected,
} from '@helpers/action-slice';
import {
  createRecipe,
  getAllRecipes,
  getFeaturedRecipes,
  getRecipesByUserId,
  getRecipeById,
} from './recipe-slice';
import { getAllLikedRecipes } from './liked-slice';
import { getAllReviews } from './review-slice';
import { getFollowersById, getFollowingById } from './follow-slice';
import {
  findRecipesByIngredient,
  findRecipesByTitle,
  findUsersByNameOrEmail,
  searchCookbooksByName,
} from './search-slice';
import { loginUser, registerUser } from './auth-slice';
import { updateUser } from './user-slice';

const initialState = {
  authLoading: false,
  featuredRecipesLoading: false,
  ownRecipesLoading: false,
  allRecipesLoading: false,
  allLikedRecipesLoading: false,
  allReviewsLoading: false,
  recipeDetailLoading: false,
  getFollowLoading: false,
  searchLoading: false,
};

const isAuthPending = isSomeAsyncActionsPending([
  registerUser,
  loginUser,
  updateUser,
]);
const isAuthFulfilled = isSomeAsyncActionsFulfilled([
  registerUser,
  loginUser,
  updateUser,
]);
const isAuthReject = isSomeAsyncActionsRejected([
  registerUser,
  loginUser,
  updateUser,
]);

const isFeaturedRecipesPending = isSomeAsyncActionsPending([
  getFeaturedRecipes,
]);
const isFeaturedRecipesFulfilled = isSomeAsyncActionsFulfilled([
  getFeaturedRecipes,
]);
const isFeaturedRecipesReject = isSomeAsyncActionsRejected([
  getFeaturedRecipes,
]);

const isOwnRecipesPending = isSomeAsyncActionsPending([
  createRecipe,
  getRecipesByUserId,
]);
const isOwnRecipesFulfilled = isSomeAsyncActionsFulfilled([
  createRecipe,
  getRecipesByUserId,
]);
const isOwnRecipesReject = isSomeAsyncActionsRejected([
  createRecipe,
  getRecipesByUserId,
]);

const isAllRecipesPending = isSomeAsyncActionsPending([getAllRecipes]);
const isAllRecipesFulfilled = isSomeAsyncActionsFulfilled([getAllRecipes]);
const isAllRecipesReject = isSomeAsyncActionsRejected([getAllRecipes]);

const isAllLikedRecipesPending = isSomeAsyncActionsPending([
  getAllLikedRecipes,
]);
const isAllLikedRecipesFulfilled = isSomeAsyncActionsFulfilled([
  getAllLikedRecipes,
]);
const isAllLikedRecipesReject = isSomeAsyncActionsRejected([
  getAllLikedRecipes,
]);

const isRecipeDetailPending = isSomeAsyncActionsPending([getRecipeById]);
const isRecipeDetailFulfilled = isSomeAsyncActionsFulfilled([getRecipeById]);
const isRecipeDetailReject = isSomeAsyncActionsRejected([getRecipeById]);

const isAllReviewsPending = isSomeAsyncActionsPending([getAllReviews]);
const isAllReviewsFulfilled = isSomeAsyncActionsFulfilled([getAllReviews]);
const isAllReviewsReject = isSomeAsyncActionsRejected([getAllReviews]);

const isFetchFollowPending = isSomeAsyncActionsPending([
  getFollowersById,
  getFollowingById,
]);
const isFetchFollowFulfilled = isSomeAsyncActionsFulfilled([
  getFollowersById,
  getFollowingById,
]);
const isFetchFollowReject = isSomeAsyncActionsRejected([
  getFollowersById,
  getFollowingById,
]);

const isSearchPending = isSomeAsyncActionsPending([
  findRecipesByTitle,
  findRecipesByIngredient,
  findUsersByNameOrEmail,
  searchCookbooksByName,
]);
const isSearchFulfilled = isSomeAsyncActionsFulfilled([
  findRecipesByTitle,
  findRecipesByIngredient,
  findUsersByNameOrEmail,
  searchCookbooksByName,
]);
const isSearchReject = isSomeAsyncActionsRejected([
  findRecipesByTitle,
  findRecipesByIngredient,
  findUsersByNameOrEmail,
  searchCookbooksByName,
]);

const reducersCreator = (initialState) => {
  const reducersObj = {};

  Object.keys(initialState).forEach((key) => {
    const capitalizeKey = capitalizeFirstLetter(key);

    reducersObj[`set${capitalizeKey}`] = (state, action) => {
      state[key] = action.payload;
    };

    reducersObj[`toggle${capitalizeKey}`] = (state, action) => {
      state[key] = action.payload;
    };
  });

  return reducersObj;
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: reducersCreator(initialState),
  extraReducers: (builder) => {
    builder.addMatcher(isAuthPending, (state) => {
      state.authLoading = true;
    });
    builder.addMatcher(isAuthFulfilled, (state) => {
      state.authLoading = false;
    });
    builder.addMatcher(isAuthReject, (state) => {
      state.authLoading = false;
    });

    builder.addMatcher(isFeaturedRecipesPending, (state) => {
      state.featuredRecipesLoading = true;
    });
    builder.addMatcher(isFeaturedRecipesFulfilled, (state) => {
      state.featuredRecipesLoading = false;
    });
    builder.addMatcher(isFeaturedRecipesReject, (state) => {
      state.featuredRecipesLoading = false;
    });

    builder.addMatcher(isOwnRecipesPending, (state) => {
      state.ownRecipesLoading = true;
    });
    builder.addMatcher(isOwnRecipesFulfilled, (state) => {
      state.ownRecipesLoading = false;
    });
    builder.addMatcher(isOwnRecipesReject, (state) => {
      state.ownRecipesLoading = false;
    });

    builder.addMatcher(isAllRecipesPending, (state) => {
      state.allRecipesLoading = true;
    });
    builder.addMatcher(isAllRecipesFulfilled, (state) => {
      state.allRecipesLoading = false;
    });
    builder.addMatcher(isAllRecipesReject, (state) => {
      state.allRecipesLoading = false;
    });

    builder.addMatcher(isAllLikedRecipesPending, (state) => {
      state.allLikedRecipesLoading = true;
    });
    builder.addMatcher(isAllLikedRecipesFulfilled, (state) => {
      state.allLikedRecipesLoading = false;
    });
    builder.addMatcher(isAllLikedRecipesReject, (state) => {
      state.allLikedRecipesLoading = false;
    });

    builder.addMatcher(isAllReviewsPending, (state) => {
      state.allReviewsLoading = true;
    });
    builder.addMatcher(isAllReviewsFulfilled, (state) => {
      state.allReviewsLoading = false;
    });
    builder.addMatcher(isAllReviewsReject, (state) => {
      state.allReviewsLoading = false;
    });

    builder.addMatcher(isRecipeDetailPending, (state) => {
      state.recipeDetailLoading = true;
    });
    builder.addMatcher(isRecipeDetailFulfilled, (state) => {
      state.recipeDetailLoading = false;
    });
    builder.addMatcher(isRecipeDetailReject, (state) => {
      state.recipeDetailLoading = false;
    });

    builder.addMatcher(isFetchFollowPending, (state) => {
      state.getFollowLoading = true;
    });
    builder.addMatcher(isFetchFollowFulfilled, (state) => {
      state.getFollowLoading = false;
    });
    builder.addMatcher(isFetchFollowReject, (state) => {
      state.getFollowLoading = false;
    });

    builder.addMatcher(isSearchPending, (state) => {
      state.searchLoading = true;
    });
    builder.addMatcher(isSearchFulfilled, (state) => {
      state.searchLoading = false;
    });
    builder.addMatcher(isSearchReject, (state) => {
      state.searchLoading = false;
    });
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
