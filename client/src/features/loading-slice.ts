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
  getMoreRecipes,
  getMyRecipes,
  getOtherUserRecipes,
  getRecipeById,
} from './recipe-slice';
import { getAllLikedRecipes, getMoreLikedRecipes } from './liked-slice';
import { getMoreReviews } from './review-slice';
import { fetchFollowersById, fetchFollowingById } from './follow-slice';

const initialState = {
  featuredRecipesLoading: false,
  ownRecipesLoading: false,
  allRecipesLoading: false,
  moreRecipesLoading: false,
  allLikedRecipesLoading: false,
  moreLikedRecipesLoading: false,
  recipeDetailLoading: false,
  moreReviewsLoading: false,
  fetchFollowLoading: false,
};

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
  getMyRecipes,
  getOtherUserRecipes,
]);
const isOwnRecipesFulfilled = isSomeAsyncActionsFulfilled([
  createRecipe,
  getMyRecipes,
  getOtherUserRecipes,
]);
const isOwnRecipesReject = isSomeAsyncActionsRejected([
  createRecipe,
  getMyRecipes,
  getOtherUserRecipes,
]);

const isAllRecipesPending = isSomeAsyncActionsPending([getAllRecipes]);
const isAllRecipesFulfilled = isSomeAsyncActionsFulfilled([getAllRecipes]);
const isAllRecipesReject = isSomeAsyncActionsRejected([getAllRecipes]);

const isMoreRecipesPending = isSomeAsyncActionsPending([getMoreRecipes]);
const isMoreRecipesFulfilled = isSomeAsyncActionsFulfilled([getMoreRecipes]);
const isMoreRecipesReject = isSomeAsyncActionsRejected([getMoreRecipes]);

const isAllLikedRecipesPending = isSomeAsyncActionsPending([
  getAllLikedRecipes,
]);
const isAllLikedRecipesFulfilled = isSomeAsyncActionsFulfilled([
  getAllLikedRecipes,
]);
const isAllLikedRecipesReject = isSomeAsyncActionsRejected([
  getAllLikedRecipes,
]);

const isMoreLikedRecipesPending = isSomeAsyncActionsPending([
  getMoreLikedRecipes,
]);
const isMoreLikedRecipesFulfilled = isSomeAsyncActionsFulfilled([
  getMoreLikedRecipes,
]);
const isMoreLikedRecipesReject = isSomeAsyncActionsRejected([
  getMoreLikedRecipes,
]);

const isRecipeDetailPending = isSomeAsyncActionsPending([getRecipeById]);
const isRecipeDetailFulfilled = isSomeAsyncActionsFulfilled([getRecipeById]);
const isRecipeDetailReject = isSomeAsyncActionsRejected([getRecipeById]);

const isMoreReviewsPending = isSomeAsyncActionsPending([getMoreReviews]);
const isMoreReviewsFulfilled = isSomeAsyncActionsFulfilled([getMoreReviews]);
const isMoreReviewsReject = isSomeAsyncActionsRejected([getMoreReviews]);

const isFetchFollowPending = isSomeAsyncActionsPending([
  fetchFollowersById,
  fetchFollowingById,
]);
const isFetchFollowFulfilled = isSomeAsyncActionsFulfilled([
  fetchFollowersById,
  fetchFollowingById,
]);
const isFetchFollowReject = isSomeAsyncActionsRejected([
  fetchFollowersById,
  fetchFollowingById,
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

    builder.addMatcher(isMoreRecipesPending, (state) => {
      state.moreRecipesLoading = true;
    });
    builder.addMatcher(isMoreRecipesFulfilled, (state) => {
      state.moreRecipesLoading = false;
    });
    builder.addMatcher(isMoreRecipesReject, (state) => {
      state.moreRecipesLoading = false;
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

    builder.addMatcher(isMoreLikedRecipesPending, (state) => {
      state.moreLikedRecipesLoading = true;
    });
    builder.addMatcher(isMoreLikedRecipesFulfilled, (state) => {
      state.moreLikedRecipesLoading = false;
    });
    builder.addMatcher(isMoreLikedRecipesReject, (state) => {
      state.moreLikedRecipesLoading = false;
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

    builder.addMatcher(isMoreReviewsPending, (state) => {
      state.moreReviewsLoading = true;
    });
    builder.addMatcher(isMoreReviewsFulfilled, (state) => {
      state.moreReviewsLoading = false;
    });
    builder.addMatcher(isMoreReviewsReject, (state) => {
      state.moreReviewsLoading = false;
    });

    builder.addMatcher(isFetchFollowPending, (state) => {
      state.fetchFollowLoading = true;
    });
    builder.addMatcher(isFetchFollowFulfilled, (state) => {
      state.fetchFollowLoading = false;
    });
    builder.addMatcher(isFetchFollowReject, (state) => {
      state.fetchFollowLoading = false;
    });
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
