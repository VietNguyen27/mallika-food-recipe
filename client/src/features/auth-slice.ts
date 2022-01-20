import { LoginData } from '@pages/Auth/Login';
import { RegisterData } from '@pages/Auth/Register';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@api/auth';
import { slowLoading } from '@helpers/helpers';

interface AuthState {
  user: any;
  loading: boolean;
  error: object[];
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: [],
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

export const fetchUser = createAsyncThunk(
  'users/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.fetch();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/:id',
  async (body: any, { rejectWithValue }) => {
    try {
      await slowLoading();
      const { _id, ...rest } = body;
      const response = await authApi.update(_id, rest);

      return response.data;
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
      state.user = null;
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
    builder.addCase(fetchUser.pending, (state) => {
      state.user = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action: any) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action: any) => {
      state.loading = false;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout, clearErrors } = authSlice.actions;
export const selectorAuthError = (state: { auth: AuthState }) =>
  state.auth.error;
export const selectorUser = (state: { auth: AuthState }) => state.auth.user;
export default authSlice.reducer;
