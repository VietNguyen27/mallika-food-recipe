import { createSlice } from '@reduxjs/toolkit';

export enum FlashMessageTypes {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

interface IFlashState {
  message: string;
  type: string;
}

const initialState: IFlashState = {
  message: '',
  type: FlashMessageTypes.SUCCESS,
};

const flashSlice = createSlice({
  name: 'flash',
  initialState,
  reducers: {
    showFlash: (state, action) => {
      const { message, type } = action.payload;

      state.message = message;
      state.type = type;
    },
    clearFlash: (state) => {
      state.message = '';
      state.type = FlashMessageTypes.SUCCESS;
    },
  },
});

export const { showFlash, clearFlash } = flashSlice.actions;
export default flashSlice.reducer;
