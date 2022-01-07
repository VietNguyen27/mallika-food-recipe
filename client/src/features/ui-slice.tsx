import { capitalizeFirstLetter } from '@helpers/helpers';
import { createSlice } from '@reduxjs/toolkit';

interface uiState {
  [uiName: string]: boolean;
}

const initialState: uiState = {
  accountDrawerShowing: false,
  likedRecipeDrawerShowing: false,
  notificationDrawerShowing: false,
  editProfileDrawerShowing: false,
};

const reducersCreator = (initialState: uiState): any => {
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
