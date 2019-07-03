'use strict';

import {createStore, applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import AppNavigator from '../navigatorApp/appNavigator';

import main from '../page/main/reducer';

import request from '../commonActions/requestReducer'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Main'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const middleware = createReactNavigationReduxMiddleware(
	"root",
	state => state.nav,
);

const rootReducer = combineReducers({
	nav: navReducer,
	main,
	request
})

const store = createStore(
  rootReducer,
  applyMiddleware(middleware),
  applyMiddleware(thunkMiddleware)
);
// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
// export default function configureStore(initialState) {
// 	const store = createStoreWithMiddleware(rootReducer, initialState);
// 	return store;
// }

export default store;