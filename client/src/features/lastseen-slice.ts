import { createSlice } from '@reduxjs/toolkit';

interface ILastSeenState {
  recipes: any;
}

const initialState: ILastSeenState = {
  recipes: [],
};

const lastSeenSlice = createSlice({
  name: 'lastSeen',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      state.recipes = action.payload;
    },
    addLastSeenRecipe: (state, action) => {
      if (state.recipes) {
        const MAX_RECIPES = 5;
        const uniqueRecipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload._id
        );

        state.recipes = [action.payload, ...uniqueRecipes].slice(
          0,
          MAX_RECIPES
        );
      }
    },
  },
});

export const getLastSeenRecipesFromSessionStorage = () => {
  const persistedState = sessionStorage.getItem('lastSeen');

  if (persistedState) {
    return JSON.parse(persistedState);
  }

  return [];
};

export const { hydrate, addLastSeenRecipe } = lastSeenSlice.actions;
export const selectorLastSeen = (state: { lastSeen: ILastSeenState }) =>
  state.lastSeen.recipes;
export default lastSeenSlice.reducer;
