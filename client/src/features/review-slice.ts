import { reviewApi } from '@api/review';
import { slowLoading } from '@helpers/helpers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isSomeAsyncActionsFulfilled } from '@helpers/action-slice';
import { updateReviews } from './recipe-slice';

interface ReviewState {
  reviews: object[] | null;
  error: any;
  loading: boolean;
}

const initialState: ReviewState = {
  reviews: null,
  error: null,
  loading: false,
};

export const getAllReviews = createAsyncThunk(
  'review/getAll',
  async (recipeId: string, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const currentUser = state.auth.user;
      const totalReviews = state.review.reviews
        ? state.review.reviews.length
        : 0;
      const response = await reviewApi.getAll(recipeId, totalReviews);
      const reviewList = response.data.map((review) => {
        const isOwner = review.user._id === currentUser._id;
        return {
          ...review,
          isOwner,
        };
      });

      return reviewList;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewReview = createAsyncThunk(
  'review/create',
  async (body: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const { recipeId, ...rest } = body;
      const state: any = getState();
      const currentUser = state.auth.user;
      const response = await reviewApi.create(recipeId, rest);
      const { rating, numReviews } = response.data;

      await dispatch(updateReviews({ rating, numReviews }));

      const reviewList = response.data.reviews.map((review) => {
        const isOwner = review.user._id === currentUser._id;
        return {
          ...review,
          isOwner,
        };
      });

      return reviewList;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReview = createAsyncThunk(
  'review/update',
  async (body: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const { recipeId, reviewId, ...rest } = body;
      const state: any = getState();
      const currentUser = state.auth.user;
      const response = await reviewApi.update(recipeId, reviewId, rest);
      const { rating, numReviews } = response.data;

      await dispatch(updateReviews({ rating, numReviews }));

      const reviewList = response.data.reviews.map((review) => {
        const isOwner = review.user._id === currentUser._id;
        return {
          ...review,
          isOwner,
        };
      });

      return reviewList;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'review/delete',
  async (body: any, { rejectWithValue, dispatch }) => {
    try {
      const { recipeId, reviewId } = body;
      const response = await reviewApi.delete(recipeId, reviewId);
      const { rating, numReviews } = response.data;

      await dispatch(updateReviews({ rating, numReviews }));

      return response.data.reviews;
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllReviews.rejected, (state, action: any) => {
      state.loading = false;
    });
    builder.addCase(createNewReview.rejected, (state, action: any) => {
      state.error = action.payload.error;
    });
    builder.addMatcher(isReviewFulfilled, (state, action: any) => {
      state.loading = false;
      state.reviews = action.payload;
    });
  },
});

export const { clearAllReviews, clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
