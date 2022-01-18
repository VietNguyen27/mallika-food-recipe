import { uuid } from '@helpers/helpers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOAST_EXPIRED_TIME } from '@config/constants';

export interface ToastItemState {
  _id?: string;
  message: string;
  type: string;
}

interface ToastState {
  toastList: ToastItemState[];
}

const initialState: ToastState = {
  toastList: [],
};

export const createToast = createAsyncThunk(
  'toast/create',
  async (body: ToastItemState, { dispatch }) => {
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
export const selectorToast = (state: { toast: ToastState }) =>
  state.toast.toastList;
export default toastSlice.reducer;
