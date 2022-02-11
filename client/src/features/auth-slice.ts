import { LoginData } from '@pages/Auth/Login';
import { RegisterData } from '@pages/Auth/Register';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@api/auth';
import { slowLoading } from '@helpers/helpers';
import { fetchUser } from './user-slice';

interface IAuthState {
  error: object[];
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: IAuthState = {
  error: [],
  loading: false,
  isLoggedIn: false,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (body: RegisterData, { dispatch, rejectWithValue }) => {
    try {
      await slowLoading();
      const response = await authApi.register(body);

      dispatch(loginUser(response.data));

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (body: LoginData, { dispatch, rejectWithValue }) => {
    try {
      await slowLoading();
      const response = await authApi.login(body);
      const token = response.data;

      localStorage.setItem('token', token);
      dispatch(fetchUser());

      return token;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
    clearError: (state, action) => {
      state.error = state.error.filter(
        (err: any) => err.context.label !== action.payload
      );
    },
    clearErrors: (state) => {
      state.error = [];
    },
  },
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
      state.isLoggedIn = true;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, clearError, clearErrors } = authSlice.actions;
export const selectorAuthError = (state: { auth: IAuthState }) =>
  state.auth.error;
export default authSlice.reducer;
