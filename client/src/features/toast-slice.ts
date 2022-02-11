import { uuid } from '@helpers/helpers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOAST_EXPIRED_TIME } from '@config/constants';

export interface IToastState {
  _id?: string;
  message: string;
  type: string;
}

interface IToastListState {
  toastList: IToastState[];
}

const initialState: IToastListState = {
  toastList: [],
};

export const createToast = createAsyncThunk(
  'toast/createNew',
  async (body: IToastState, { dispatch }) => {
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
export const selectorToast = (state: { toast: IToastListState }) =>
  state.toast.toastList;
export default toastSlice.reducer;
