import { recipeApi } from '@api/recipe';
import { DOWNWARDS, UPWARDS } from '@config/constants';
import { slowLoading } from '@helpers/helpers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface IngredientState {
  _id?: string;
  title: string;
  isHeader: boolean;
}

export interface StepState {
  _id?: string;
  title: string;
  isHeader: boolean;
}

export interface RecipeData {
  user: string;
  title?: string;
  time?: object;
  image?: object;
  description?: string;
  difficulty: number;
  serve?: number;
  ingredients: IngredientState[];
  steps: StepState[];
  reviews: object[];
}

interface RecipeState {
  success: boolean;
  intro: object;
  ingredients: IngredientState[];
  steps: StepState[];
  error: object[];
  recipes: object[];
  featured_recipes: object[];
  my_recipes: object[];
}

const initialState: RecipeState = {
  success: false,
  intro: {},
  ingredients: [],
  steps: [],
  error: [],
  recipes: [],
  featured_recipes: [],
  my_recipes: [],
};

export const createRecipe = createAsyncThunk(
  'recipes/create',
  async (body: RecipeData, { rejectWithValue }) => {
    try {
      await slowLoading();
      const response = await recipeApi.create(body);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeaturedRecipes = createAsyncThunk(
  'recipes/featured',
  async (_, { rejectWithValue }) => {
    try {
      await slowLoading();
      const response = await recipeApi.getFeatured();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyRecipes = createAsyncThunk(
  'recipes/me',
  async (_, { rejectWithValue }) => {
    try {
      await slowLoading();
      const response = await recipeApi.getMine();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addRecipeWidget: (state, action) => {
      const { type, ...rest } = action.payload;
      state[type] = [...state[type], rest];
    },
    editRecipeWidget: (state, action) => {
      const { type, ...rest } = action.payload;
      const index = state[type].findIndex(
        ({ _id }) => _id === action.payload._id
      );
      state[type][index] = { ...state[type][index], ...rest };
    },
    changePositionRecipeWidget: (state, action) => {
      const { type, direction } = action.payload;
      const index = state[type].findIndex(
        ({ _id }) => _id === action.payload._id
      );
      const siblingIndex = index + (direction === UPWARDS ? -1 : 1);

      if (
        (index === 0 && direction === UPWARDS) ||
        (index === state[type].length - 1 && direction === DOWNWARDS)
      ) {
        return state;
      }

      [state[type][siblingIndex], state[type][index]] = [
        state[type][index],
        state[type][siblingIndex],
      ];
    },
    removeRecipeWidget: (state, action) => {
      const { type } = action.payload;
      state[type] = state[type].filter(({ _id }) => _id !== action.payload._id);
    },
    clearErrors: (state) => {
      state.error = [];
    },
    changeStatusSuccess: (state) => {
      state.success = !state.success;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRecipe.fulfilled, (state, action: any) => {
      state.success = true;
      state.ingredients = [];
      state.steps = [];
      state.error = [];
      state.my_recipes = [action.payload, ...state.my_recipes];
    });
    builder.addCase(createRecipe.rejected, (state, action: any) => {
      state.error = action.payload;
    });
    builder.addCase(getFeaturedRecipes.fulfilled, (state, action: any) => {
      state.featured_recipes = action.payload;
    });
    builder.addCase(getMyRecipes.fulfilled, (state, action: any) => {
      state.my_recipes = action.payload;
    });
  },
});

export const {
  addRecipeWidget,
  editRecipeWidget,
  changePositionRecipeWidget,
  removeRecipeWidget,
  clearErrors,
  changeStatusSuccess,
} = recipeSlice.actions;
export const selectorRecipeIntro = (state: { recipe: RecipeState }) =>
  state.recipe.intro;
export const selectorRecipeIngredients = (state: { recipe: RecipeState }) =>
  state.recipe.ingredients;
export const selectorRecipeSteps = (state: { recipe: RecipeState }) =>
  state.recipe.steps;
export const selectorRecipeError = (state: { recipe: RecipeState }) =>
  state.recipe.error;
export const selectorRecipes = (state: { recipe: RecipeState }) =>
  state.recipe.recipes;
export const selectorFeaturedRecipes = (state: { recipe: RecipeState }) =>
  state.recipe.featured_recipes;
export const selectorMyRecipes = (state: { recipe: RecipeState }) =>
  state.recipe.my_recipes;
export default recipeSlice.reducer;
