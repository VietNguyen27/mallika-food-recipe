import { LoginData } from '@pages/Auth/Login';
import { RegisterData } from '@pages/Auth/Register';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@api/auth';

interface authState {
  loading: boolean;
  error: object[];
}

const initialState: authState = {
  loading: false,
  error: [],
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (body: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(body);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (body: LoginData, { rejectWithValue }) => {
    try {
      const response = await authApi.login(body);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const selectorAuthError = (state: { auth: authState }) =>
  state.auth.error;
export default authSlice.reducer;
