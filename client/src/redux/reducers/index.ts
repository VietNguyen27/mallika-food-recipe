import { combineReducers } from 'redux';
import authReducer from '@features/AuthSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
