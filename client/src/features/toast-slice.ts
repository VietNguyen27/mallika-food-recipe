import { uuid } from '@helpers/helpers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOAST_EXPIRED_TIME } from '@config/constants';

export interface ToastProps {
  _id?: string;
  message: string;
  type: string;
}

interface ToastListState {
  toastList: ToastProps[];
}

const initialState: ToastListState = {
  toastList: [],
};

export const createToast = createAsyncThunk(
  'toast/create',
  async (body: ToastProps, { dispatch }) => {
    const _id = uuid();
    const toast = {
      _id,
      ...body,
    };

    dispatch(addToast(toast));

    setTimeout(() => {
      dispatch(removeToast(_id));
    }, TOAST_EXPIRED_TIME);
  }
);

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toastList = [...state.toastList, action.payload];
    },
    removeToast: (state, action) => {
      state.toastList = state.toastList.filter(
        ({ _id }) => _id !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export const selectorToast = (state: { toast: ToastListState }) =>
  state.toast.toastList;
export default toastSlice.reducer;
