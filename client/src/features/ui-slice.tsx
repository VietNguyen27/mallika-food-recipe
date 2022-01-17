import { capitalizeFirstLetter } from '@helpers/helpers';
import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  [uiName: string]: boolean;
}

const initialState: UiState = {
  accountDrawerShowing: false,
  likedRecipeDrawerShowing: false,
  notificationDrawerShowing: false,
  editProfileDrawerShowing: false,
  addRecipeDrawerShowing: false,
};

const reducersCreator = (initialState: UiState): any => {
  const reducersObj = {};

  Object.keys(initialState).forEach((key) => {
    const capitalizeKey = capitalizeFirstLetter(key);

    reducersObj[`set${capitalizeKey}`] = (state, action) => {
      state[key] = action.payload;
    };

    reducersObj[`toggle${capitalizeKey}`] = (state, action) => {
      state[key] = action.payload;
    };
  });

  return reducersObj;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: reducersCreator(initialState),
});

export const uiActions: any = uiSlice.actions;
export default uiSlice.reducer;
