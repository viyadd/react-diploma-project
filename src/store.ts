import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
	appLoading,
} from './reducers';

const reducer = combineReducers({
	loading: appLoading,
	app: appReducer,
	user: userReducer,
});

const composeEnhangers = window.__REDUX_DEVTOOLS_EXTANSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhangers(applyMiddleware(thunk)));

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
