import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@api/user';
import { slowLoading } from '@helpers/helpers';

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: {},
};

export const fetchUserById = createAsyncThunk(
  'users/user',
  async (id: any, { rejectWithValue }) => {
    try {
      await slowLoading();
      const response = await userApi.fetchById(id);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action: any) => {
      state.user[action.payload._id] = action.payload;
    });
  },
});

export default userSlice.reducer;
