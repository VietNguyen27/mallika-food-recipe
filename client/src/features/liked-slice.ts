import { likedApi } from '@api/liked';
import { slowLoading } from '@helpers/helpers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RECIPES_BY_TYPE } from '@config/recipe';

export interface LikedRecipeData {
  recipe: string;
  user: string;
}

interface ILikedState {
  recipes: object[] | null;
}

const initialState: ILikedState = {
  recipes: null,
};

export const addLikedRecipe = createAsyncThunk(
  'liked/addNew',
  async (body: LikedRecipeData, { rejectWithValue }) => {
    try {
      const response = await likedApi.create(body);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeLikedRecipe = createAsyncThunk(
  'liked/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await likedApi.remove(id);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllLikedRecipes = createAsyncThunk(
  'liked/getAll',
  async (_, { rejectWithValue }) => {
    try {
      await slowLoading();
      const response = await likedApi.getAll();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMoreLikedRecipes = createAsyncThunk(
  'liked/getMore',
  async (_, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const totalLikedRecipes = state.liked.recipes.length;
      const response = await likedApi.getMore(totalLikedRecipes);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLikedRecipe.fulfilled, (state, action) => {
      const likedRecipe = { ...action.payload, type: RECIPES_BY_TYPE.OTHER };

      if (state.recipes) {
        state.recipes = [likedRecipe, ...state.recipes];
      } else {
        state.recipes = [likedRecipe];
      }
    });
    builder.addCase(removeLikedRecipe.fulfilled, (state, action) => {
      state.recipes =
        state.recipes &&
        state.recipes.filter(
          ({ recipe }: any) => recipe._id !== action.payload
        );
    });
    builder.addCase(getAllLikedRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload.map((recipe) => ({
        ...recipe,
        type: RECIPES_BY_TYPE.LIKED,
      }));
    });
    builder.addCase(getMoreLikedRecipes.fulfilled, (state, action) => {
      if (state.recipes) {
        state.recipes = [
          ...state.recipes,
          ...action.payload.map((recipe) => ({
            ...recipe,
            type: RECIPES_BY_TYPE.LIKED,
          })),
        ];
      }
    });
  },
});

export const selectorLikedRecipes = (state: { liked: ILikedState }) =>
  state.liked.recipes;
export default likedSlice.reducer;
