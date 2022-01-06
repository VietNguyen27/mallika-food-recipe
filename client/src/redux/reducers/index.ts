import { combineReducers } from 'redux';
import authReducer from '@features/auth-slice';
import uiReducer from '@features/ui-slice';
import toastReducer from '@features/toast-slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  toast: toastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
