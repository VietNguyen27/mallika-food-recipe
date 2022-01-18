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
  isPublished: boolean;
}

interface RecipeState {
  loading: boolean;
  intro: object;
  ingredients: IngredientState[];
  steps: StepState[];
  error: object[];
}

const initialState: RecipeState = {
  loading: false,
  intro: {},
  ingredients: [],
  steps: [],
  error: [],
};

export const createRecipe = createAsyncThunk(
  'recipe/create',
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
  },
  extraReducers: (builder) => {
    builder.addCase(createRecipe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRecipe.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createRecipe.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    });
  },
});

export const {
  addRecipeWidget,
  editRecipeWidget,
  changePositionRecipeWidget,
  removeRecipeWidget,
  clearErrors,
} = recipeSlice.actions;
export const selectorRecipeIntro = (state: { recipe: RecipeState }) =>
  state.recipe.intro;
export const selectorRecipeIngredients = (state: { recipe: RecipeState }) =>
  state.recipe.ingredients;
export const selectorRecipeSteps = (state: { recipe: RecipeState }) =>
  state.recipe.steps;
export const selectorRecipeError = (state: { recipe: RecipeState }) =>
  state.recipe.error;
export default recipeSlice.reducer;
