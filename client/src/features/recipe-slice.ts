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
  outOfRecipe: boolean;
  intro: object;
  ingredients: IngredientState[];
  steps: StepState[];
  error: object[];
  recipes: object[];
  featuredRecipes: object[];
  myRecipes: object[];
}

const initialState: RecipeState = {
  success: false,
  outOfRecipe: false,
  intro: {},
  ingredients: [],
  steps: [],
  error: [],
  recipes: [],
  featuredRecipes: [],
  myRecipes: [],
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

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async (body: any, { rejectWithValue }) => {
    try {
      await slowLoading();
      const { _id, ...rest } = body;
      const response = await recipeApi.update(_id, rest);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const increaseLikedCount = createAsyncThunk(
  'recipes/like',
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await recipeApi.like(_id);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const decreaseLikedCount = createAsyncThunk(
  'recipes/unlike',
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await recipeApi.unlike(_id);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeaturedRecipes = createAsyncThunk(
  'recipes/featured',
  async (_, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const userId = state.auth.user._id;
      const response = await recipeApi.getFeatured();
      const recipes = response.data.map((recipe) => {
        const isLiked = recipe.likes.includes(userId);

        return {
          ...recipe,
          isLiked,
        };
      });

      return recipes;
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

export const getAllRecipes = createAsyncThunk(
  'recipes/all',
  async (_, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const userId = state.auth.user._id;
      const response = await recipeApi.getAll();
      const recipes = response.data.map((recipe) => {
        const isLiked = recipe.likes.includes(userId);

        return {
          ...recipe,
          isLiked,
        };
      });

      return recipes;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMoreRecipes = createAsyncThunk(
  'recipes/more',
  async (_, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const userId = state.auth.user._id;
      const totalRecipes = state.recipe.recipes.length;
      const response = await recipeApi.getMore(totalRecipes);
      const recipes = response.data.map((recipe) => {
        const isLiked = recipe.likes.includes(userId);

        return {
          ...recipe,
          isLiked,
        };
      });

      return recipes;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipe',
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
    clearError: (state, action) => {
      state.error = state.error.filter(
        (err: any) => err.context.label !== action.payload
      );
    },
    clearErrors: (state) => {
      state.error = [];
    },
    clearRecipeWidgets: (state) => {
      state.steps = [];
      state.ingredients = [];
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
      state.myRecipes = [action.payload, ...state.myRecipes];
    });
    builder.addCase(createRecipe.rejected, (state, action: any) => {
      state.error = action.payload;
    });
    builder.addCase(increaseLikedCount.fulfilled, (state: any, action: any) => {
      const index = state.recipes.findIndex(
        ({ _id }) => _id === action.payload._id
      );
      const featuredIndex = state.featuredRecipes.findIndex(
        ({ _id }) => _id === action.payload._id
      );

      if (index !== -1) {
        state.recipes[index] = {
          ...action.payload,
          isLiked: true,
        };
      }

      if (featuredIndex !== -1) {
        state.featuredRecipes[featuredIndex] = {
          ...action.payload,
          isLiked: true,
        };
      }
    });
    builder.addCase(decreaseLikedCount.fulfilled, (state: any, action: any) => {
      const index = state.recipes.findIndex(
        ({ _id }) => _id === action.payload._id
      );
      const featuredIndex = state.featuredRecipes.findIndex(
        ({ _id }) => _id === action.payload._id
      );

      if (index !== -1) {
        state.recipes[index] = {
          ...action.payload,
          isLiked: false,
        };
      }

      if (featuredIndex !== -1) {
        state.featuredRecipes[featuredIndex] = {
          ...action.payload,
          isLiked: false,
        };
      }
    });
    builder.addCase(getFeaturedRecipes.fulfilled, (state, action: any) => {
      state.featuredRecipes = action.payload;
    });
    builder.addCase(getMyRecipes.fulfilled, (state, action: any) => {
      state.myRecipes = action.payload;
    });
    builder.addCase(getAllRecipes.fulfilled, (state, action: any) => {
      state.recipes = action.payload;
    });
    builder.addCase(getMoreRecipes.fulfilled, (state, action: any) => {
      if (action.payload.length) {
        state.recipes = [...state.recipes, ...action.payload];
      } else {
        state.outOfRecipe = true;
      }
    });
  },
});

export const {
  addRecipeWidget,
  editRecipeWidget,
  changePositionRecipeWidget,
  removeRecipeWidget,
  clearError,
  clearErrors,
  clearRecipeWidgets,
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
  state.recipe.featuredRecipes;
export const selectorMyRecipes = (state: { recipe: RecipeState }) =>
  state.recipe.myRecipes;
export default recipeSlice.reducer;
