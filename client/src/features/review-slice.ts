import { reviewApi } from '@api/review';
import { slowLoading } from '@helpers/helpers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isSomeAsyncActionsFulfilled } from '@helpers/action-slice';
import { updateReviews } from './recipe-slice';

interface ReviewState {
  reviews: object[] | null;
  error: object[];
  loading: boolean;
}

const initialState: ReviewState = {
  reviews: null,
  error: [],
  loading: false,
};

export const getAllReviews = createAsyncThunk(
  'review/getAll',
  async (recipeId: string, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const totalReviews = state.review.reviews
        ? state.review.reviews.length
        : 0;
      const response = await reviewApi.getAll(recipeId, totalReviews);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewReview = createAsyncThunk(
  'review/create',
  async (body: any, { rejectWithValue, dispatch }) => {
    try {
      await slowLoading();
      const { recipeId, ...rest } = body;
      const response = await reviewApi.create(recipeId, rest);
      const { rating, numReviews } = response.data;

      dispatch(updateReviews({ rating, numReviews }));

      return response.data.reviews;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReview = createAsyncThunk(
  'review/update',
  async (body: any, { rejectWithValue }) => {
    try {
      const { recipeId, reviewId, ...rest } = body;
      const response = await reviewApi.update(recipeId, reviewId, rest);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'review/delete',
  async (body: any, { rejectWithValue }) => {
    try {
      const { recipeId, reviewId } = body;
      const response = await reviewApi.delete(recipeId, reviewId);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isReviewFulfilled = isSomeAsyncActionsFulfilled([
  getAllReviews,
  createNewReview,
  updateReview,
  deleteReview,
]);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearAllReviews: (state) => {
      state.reviews = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReviews.pending, (state, action: any) => {
      state.loading = true;
    });
    builder.addCase(getAllReviews.rejected, (state, action: any) => {
      state.loading = false;
    });
    builder.addMatcher(isReviewFulfilled, (state, action: any) => {
      state.loading = false;
      state.reviews = action.payload;
    });
  },
});

export const { clearAllReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
