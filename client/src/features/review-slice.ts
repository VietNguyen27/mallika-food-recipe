import { reviewApi } from '@api/review';
import { slowLoading } from '@helpers/helpers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isSomeAsyncActionsFulfilled } from '@helpers/action-slice';
import { updateReviews } from './recipe-slice';

interface ReviewState {
  reviews: any;
  error: any;
  loading: boolean;
  outOfReview: boolean;
}

const initialState: ReviewState = {
  reviews: {},
  error: null,
  loading: false,
  outOfReview: false,
};

export const getAllReviews = createAsyncThunk(
  'review/getAll',
  async (recipeId: string, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const currentUser = state.user.user;
      const response = await reviewApi.getAll(recipeId);
      const reviewList = response.data.map((review) => {
        const isOwner = review.user._id === currentUser._id;
        return {
          ...review,
          isOwner,
        };
      });

      return {
        [recipeId]: reviewList,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMoreReviews = createAsyncThunk(
  'review/getMore',
  async (recipeId: string, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const currentUser = state.user.user;
      const totalReviews = state.review.reviews[recipeId]
        ? state.review.reviews[recipeId].length
        : 0;
      const response = await reviewApi.getMore(recipeId, totalReviews);
      const reviewList = response.data.map((review) => {
        const isOwner = review.user._id === currentUser._id;
        return {
          ...review,
          isOwner,
        };
      });

      return {
        [recipeId]: reviewList,
      };
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
      const currentUser = state.user.user;
      const response = await reviewApi.create(recipeId, rest);
      const { rating, numReviews } = response.data;

      await dispatch(updateReviews({ recipeId, rating, numReviews }));

      const reviewList = response.data.reviews.map((review) => {
        const isOwner = review.user._id === currentUser._id;
        return {
          ...review,
          isOwner,
        };
      });

      return {
        [recipeId]: reviewList,
      };
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
      const currentUser = state.user.user;
      const response = await reviewApi.update(recipeId, reviewId, rest);
      const { rating, numReviews } = response.data;

      await dispatch(updateReviews({ recipeId, rating, numReviews }));

      const reviewList = response.data.reviews.map((review) => {
        const isOwner = review.user._id === currentUser._id;
        return {
          ...review,
          isOwner,
        };
      });

      return {
        [recipeId]: reviewList,
      };
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

      await dispatch(updateReviews({ recipeId, rating, numReviews }));

      return {
        [recipeId]: response.data.reviews,
      };
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
    builder.addCase(getMoreReviews.fulfilled, (state, action: any) => {
      if (Object.values(action.payload as object)[0].length) {
        const [key, value]: any = Object.entries(action.payload)[0];
        state.reviews[key] = [...state.reviews[key], ...value];
      } else {
        state.outOfReview = true;
      }
    });
    builder.addMatcher(isReviewFulfilled, (state, action: any) => {
      const [key, value]: any = Object.entries(action.payload)[0];

      state.loading = false;
      state.reviews[key] = value;
    });
  },
});

export const { clearAllReviews, clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
