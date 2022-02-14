import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { followApi } from '@api/follow';
import { slowLoading } from '@helpers/helpers';

interface IFollowState {
  followers: any;
  following: any;
}

const initialState: IFollowState = {
  followers: {},
  following: {},
};

export const getFollowersById = createAsyncThunk(
  'users/getFollowersById',
  async (id: any, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const totalFollowers = state.follow.followers[id]
        ? state.follow.followers[id].followers.length
        : 0;
      const response = await followApi.getFollowers(id, totalFollowers);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFollowingById = createAsyncThunk(
  'users/getFollowingById',
  async (id: any, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const totalFollowing = state.follow.following[id]
        ? state.follow.following[id].following.length
        : 0;
      const response = await followApi.getFollowing(id, totalFollowing);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFollowersById.fulfilled, (state, action) => {
      const { _id: userId, followers } = action.payload;

      if (state.followers[userId] && followers.length === 0) {
        state.followers[userId].outOfFollowers = true;
      }

      if (!state.followers[userId]) {
        state.followers[userId] = {
          ...action.payload,
          outOfFollowers: false,
        };
      } else {
        state.followers[userId].followers = [
          ...state.followers[userId].followers,
          ...followers,
        ];
      }
    });

    builder.addCase(getFollowingById.fulfilled, (state, action) => {
      const { _id: userId, following } = action.payload;

      if (state.following[userId] && following.length === 0) {
        state.following[userId].outOfFollowing = true;
      }

      if (!state.following[userId]) {
        state.following[userId] = {
          ...action.payload,
          outOfFollowing: false,
        };
      } else {
        state.following[userId].following = [
          ...state.following[userId].following,
          ...following,
        ];
      }
    });
  },
});

export const selectorFollowers = (state: { follow: IFollowState }) =>
  state.follow.followers;
export const selectorFollowing = (state: { follow: IFollowState }) =>
  state.follow.following;
export default followSlice.reducer;
