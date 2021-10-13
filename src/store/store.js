// const { createStore, applyMiddleware, combineReducers, compose } = Redux
// const thunk = ReduxThunk.default

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { stayReducer } from './stay.reducer.js';
import { userReducer } from './user.reducer.js';
import { reviewReducer } from './review.reducer';
import { systemReducer } from './system.reducer';
import { orderReducer } from './order.reducer';
import { pageReducer } from './page.reducer';

const rootReducer = combineReducers({
  stayModule: stayReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
  orderModule: orderReducer,
  pageModule: pageReducer,
 
});

// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// export const store = createStore(rootReducer, applyMiddleware(thunk))
