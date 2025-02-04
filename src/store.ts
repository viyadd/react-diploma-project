import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
});

const composeEnhangers = window.__REDUX_DEVTOOLS_EXTANSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhangers(applyMiddleware(thunk)));
