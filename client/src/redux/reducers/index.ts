import { combineReducers } from 'redux';
import authReducer from '@features/auth-slice';
import uiReducer from '@features/ui-slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
