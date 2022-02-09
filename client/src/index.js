import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import {
  getLastSeenRecipesFromSessionStorage,
  hydrate,
} from '@features/lastseen-slice';

store.subscribe(() => {
  const lastSeenRecipes = store.getState().lastSeen.recipes;
  if (lastSeenRecipes) {
    sessionStorage.setItem('lastSeen', JSON.stringify(lastSeenRecipes));
  }
});

const lastSeenRecipes = getLastSeenRecipesFromSessionStorage();

if (lastSeenRecipes) {
  store.dispatch(hydrate(lastSeenRecipes));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
