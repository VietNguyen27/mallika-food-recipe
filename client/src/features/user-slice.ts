import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@api/user';
import { slowLoading } from '@helpers/helpers';
import { isSomeAsyncActionsFulfilled } from '@helpers/action-slice';

interface UserState {
  user: any;
  users: any;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  users: {},
  loading: false,
};

export const fetchUser = createAsyncThunk(
  'users/fetchByToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.fetch();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id: any, { rejectWithValue, getState }) => {
    try {
      await slowLoading();
      const state: any = getState();
      const userId = state.user.user._id;
      const response = await userApi.fetchById(id);
      const isFollowing = response.data.followers.includes(userId);

      return {
        ...response.data,
        isFollowing,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateById',
  async (body: any, { rejectWithValue }) => {
    try {
      await slowLoading();
      const { _id, ...rest } = body;
      const response = await userApi.update(_id, rest);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  'users/followById',
  async (followedUserId: any, { rejectWithValue }) => {
    try {
      const response = await userApi.follow(followedUserId);
      const { user, followedUser } = response.data;

      return { user, followedUser };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'users/unfollowById',
  async (followedUserId: any, { rejectWithValue }) => {
    try {
      const response = await userApi.unfollow(followedUserId);
      const { user, followedUser } = response.data;

      return { user, followedUser };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isFollowUserFulfilled = isSomeAsyncActionsFulfilled([
  followUser,
  unfollowUser,
]);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    finishSplash: (state, action) => {
      state.user.firstLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.users[action.payload._id] = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
    });

    builder.addMatcher(isFollowUserFulfilled, (state, action) => {
      const { user, followedUser } = action.payload;

      state.user = {
        ...state.user,
        ...user,
      };
      state.users[followedUser._id] = {
        ...state.users[followedUser._id],
        ...followedUser,
      };
    });
  },
});

export const { finishSplash } = userSlice.actions;
export const selectorUser = (state: { user: UserState }) => state.user.user;
export default userSlice.reducer;
