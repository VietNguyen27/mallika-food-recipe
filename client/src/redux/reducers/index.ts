import { combineReducers } from 'redux';
import authReducer from '@features/auth-slice';
import uiReducer from '@features/ui-slice';
import toastReducer from '@features/toast-slice';
import recipeReducer from '@features/recipe-slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  toast: toastReducer,
  recipe: recipeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
