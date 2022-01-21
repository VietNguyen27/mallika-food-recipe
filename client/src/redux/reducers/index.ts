import { combineReducers } from 'redux';
import authReducer from '@features/auth-slice';
import uiReducer from '@features/ui-slice';
import toastReducer from '@features/toast-slice';
import recipeReducer from '@features/recipe-slice';
import loadingReducer from '@features/loading-slice';

export const appReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  toast: toastReducer,
  loading: loadingReducer,
  recipe: recipeReducer,
});

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
