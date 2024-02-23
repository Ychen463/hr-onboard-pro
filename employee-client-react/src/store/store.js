import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducter from './reducers/index.js';

const store = createStore(
  rootReducter,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
);

export const createAction = (type, payload) => ({ type, payload });

export default store;
