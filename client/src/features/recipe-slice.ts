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

interface IRecipeState {
  success: boolean;
  outOfRecipe: boolean;
  outOfOwnRecipe: boolean;
  intro: object;
  ingredients: IngredientState[];
  steps: StepState[];
  error: object[];
  recipe: any;
  recipes: object[];
  featuredRecipes: object[];
  ownRecipes: any;
}

const initialState: IRecipeState = {
  success: false,
  outOfRecipe: false,
  outOfOwnRecipe: false,
  intro: {},
  ingredients: [],
  steps: [],
  error: [],
  recipe: {},
  recipes: [],
  featuredRecipes: [],
  ownRecipes: {},
};

export const createRecipe = createAsyncThunk(
  'recipes/createNew',
  async (body: RecipeData, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const currentUser = state.user.user;
      const response = await recipeApi.create(body);

      return { [currentUser]: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  'recipes/updateSpecified',
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
  'recipes/increaseLikedCount',
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
  'recipes/decreaseLikedCount',
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
  'recipes/getFeatured',
  async (_, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const userId = state.user.user._id;
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

export const getRecipesByUserId = createAsyncThunk(
  'recipes/getByUserId',
  async (userId: any, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const totalOwnRecipes = state.recipe.ownRecipes[userId]
        ? state.recipe.ownRecipes[userId].recipes.length
        : 0;
      const response = await recipeApi.getByUserId(userId, totalOwnRecipes);

      return {
        [userId]: response.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllRecipes = createAsyncThunk(
  'recipes/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const userId = state.user.user._id;
      const totalRecipes = state.recipe.recipes.length;
      const response = await recipeApi.getAll(totalRecipes);
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

export const getRecipeById = createAsyncThunk(
  'recipes/getById',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const userId = state.user.user._id;
      const response = await recipeApi.getById(id);
      const isLiked = response.data.likes.includes(userId);

      return {
        ...response.data,
        isLiked,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    createRecipeWidget: (state, action) => {
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
    updateReviews: (state, action) => {
      const { recipeId, rating, numReviews } = action.payload;
      state.recipe[recipeId].rating = rating;
      state.recipe[recipeId].numReviews = numReviews;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      const [key, value]: any = Object.entries(action.payload)[0];

      state.success = true;
      state.ingredients = [];
      state.steps = [];
      state.error = [];
      if (state.ownRecipes[key]) {
        state.ownRecipes[key] = [value, ...state.ownRecipes[key]];
      } else {
        state.ownRecipes[key] = [action.payload];
      }
    });
    builder.addCase(createRecipe.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    builder.addCase(increaseLikedCount.fulfilled, (state: any, action) => {
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

      if (state.recipe[action.payload._id]) {
        state.recipe[action.payload._id] = {
          ...action.payload,
          isLiked: true,
        };
      }
    });

    builder.addCase(decreaseLikedCount.fulfilled, (state: any, action) => {
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

      if (state.recipe[action.payload._id]) {
        state.recipe[action.payload._id] = {
          ...action.payload,
          isLiked: false,
        };
      }
    });

    builder.addCase(getFeaturedRecipes.fulfilled, (state, action) => {
      state.featuredRecipes = action.payload;
    });

    builder.addCase(getRecipesByUserId.fulfilled, (state, action) => {
      const [key, value]: any = Object.entries(action.payload)[0];

      if (state.ownRecipes[key] && value.length === 0) {
        state.ownRecipes[key].outOfRecipes = true;
      }

      if (!state.ownRecipes[key]) {
        state.ownRecipes[key] = {
          recipes: value,
          outOfRecipes: false,
        };
      } else {
        state.ownRecipes[key].recipes = [
          ...state.ownRecipes[key].recipes,
          ...value,
        ];
      }
    });

    builder.addCase(getAllRecipes.fulfilled, (state, action) => {
      state.recipes = [...state.recipes, ...action.payload];

      if (state.recipes && !action.payload.length) {
        state.outOfRecipe = true;
      }
    });

    builder.addCase(getRecipeById.fulfilled, (state, action) => {
      state.recipe[action.payload._id] = action.payload;
    });
  },
});

export const {
  createRecipeWidget,
  editRecipeWidget,
  changePositionRecipeWidget,
  removeRecipeWidget,
  clearError,
  clearErrors,
  clearRecipeWidgets,
  changeStatusSuccess,
  updateReviews,
} = recipeSlice.actions;
export const selectorRecipeIntro = (state: { recipe: IRecipeState }) =>
  state.recipe.intro;
export const selectorRecipeIngredients = (state: { recipe: IRecipeState }) =>
  state.recipe.ingredients;
export const selectorRecipeSteps = (state: { recipe: IRecipeState }) =>
  state.recipe.steps;
export const selectorRecipeError = (state: { recipe: IRecipeState }) =>
  state.recipe.error;
export const selectorRecipes = (state: { recipe: IRecipeState }) =>
  state.recipe.recipes;
export const selectorFeaturedRecipes = (state: { recipe: IRecipeState }) =>
  state.recipe.featuredRecipes;
export const selectorOwnRecipes = (state: { recipe: IRecipeState }) =>
  state.recipe.ownRecipes;
export const selectorRecipe = (state: { recipe: IRecipeState }) =>
  state.recipe.recipe;
export default recipeSlice.reducer;
