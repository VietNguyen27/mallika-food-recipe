import { combineReducers } from 'redux';
import authReducer from '@features/auth-slice';
import userReducer from '@features/user-slice';
import uiReducer from '@features/ui-slice';
import toastReducer from '@features/toast-slice';
import recipeReducer from '@features/recipe-slice';
import loadingReducer from '@features/loading-slice';
import likedReducer from '@features/liked-slice';
import searchReducer from '@features/search-slice';
import reviewReducer from '@features/review-slice';
import lastSeenReducer from '@features/lastseen-slice';
import followReducer from '@features/follow-slice';

export const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
  toast: toastReducer,
  loading: loadingReducer,
  recipe: recipeReducer,
  liked: likedReducer,
  search: searchReducer,
  review: reviewReducer,
  lastSeen: lastSeenReducer,
  follow: followReducer,
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
