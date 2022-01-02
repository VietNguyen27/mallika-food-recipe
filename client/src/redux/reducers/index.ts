import { combineReducers } from 'redux';
import authReducer from '@features/AuthSlice';

export default combineReducers({
  auth: authReducer,
});
