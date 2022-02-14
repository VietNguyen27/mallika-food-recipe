import { reviewApi } from '@api/review';
import { slowLoading } from '@helpers/helpers';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  isSomeAsyncActionsFulfilled,
  isSomeAsyncActionsPending,
  isSomeAsyncActionsRejected,
} from '@helpers/action-slice';
import { updateReviews } from './recipe-slice';
import { FlashMessageTypes, showFlash } from './flash-slice';

interface IReviewState {
  reviews: any;
  error: any;
  outOfReview: boolean;
}

const initialState: IReviewState = {
  reviews: {},
  error: null,
  outOfReview: false,
};

export const getAllReviews = createAsyncThunk(
  'review/getAll',
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
  'review/createNew',
  async (body: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const { recipeId, ...rest } = body;
      const state: any = getState();
      const currentUser = state.user.user;
      const response = await reviewApi.create(recipeId, rest);
      const { rating, numReviews } = response.data;

      await dispatch(updateReviews({ recipeId, rating, numReviews }));
      dispatch(
        showFlash({
          message: 'Comment added successfully!',
          type: FlashMessageTypes.SUCCESS,
        })
      );

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
  'review/updateSpecified',
  async (body: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const { recipeId, reviewId, ...rest } = body;
      const state: any = getState();
      const currentUser = state.user.user;
      const response = await reviewApi.update(recipeId, reviewId, rest);
      const { rating, numReviews } = response.data;

      await dispatch(updateReviews({ recipeId, rating, numReviews }));
      dispatch(
        showFlash({
          message: 'Comment update successfully!',
          type: FlashMessageTypes.SUCCESS,
        })
      );

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
  'review/deleteSpecified',
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
    builder.addCase(getAllReviews.fulfilled, (state, action: any) => {
      const [key, value]: any = Object.entries(action.payload)[0];

      if (state.reviews[key]) {
        state.reviews[key] = [...state.reviews[key], ...value];
      } else {
        state.reviews[key] = value;
      }

      if (!Object.values(action.payload as object)[0].length) {
        state.outOfReview = true;
      }
    });

    builder.addCase(createNewReview.rejected, (state, action: any) => {
      state.error = action.payload.error;
    });

    builder.addMatcher(isReviewFulfilled, (state, action) => {
      const [key, value]: any = Object.entries(action.payload)[0];

      state.reviews[key] = value;
    });
  },
});

export const { clearAllReviews, clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
