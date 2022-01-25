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
  getRecipeById,
} from './recipe-slice';
import { getAllLikedRecipes, getMoreLikedRecipes } from './liked-slice';

const initialState = {
  featuredRecipesLoading: false,
  myRecipesLoading: false,
  allRecipesLoading: false,
  moreRecipesLoading: false,
  allLikedRecipesLoading: false,
  moreLikedRecipesLoading: false,
  recipeDetailLoading: false,
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

const isMyRecipesPending = isSomeAsyncActionsPending([
  createRecipe,
  getMyRecipes,
]);
const isMyRecipesFulfilled = isSomeAsyncActionsFulfilled([
  createRecipe,
  getMyRecipes,
]);
const isMyRecipesReject = isSomeAsyncActionsRejected([
  createRecipe,
  getMyRecipes,
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

    builder.addMatcher(isMyRecipesPending, (state) => {
      state.myRecipesLoading = true;
    });
    builder.addMatcher(isMyRecipesFulfilled, (state) => {
      state.myRecipesLoading = false;
    });
    builder.addMatcher(isMyRecipesReject, (state) => {
      state.myRecipesLoading = false;
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
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
