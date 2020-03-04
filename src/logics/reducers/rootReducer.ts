import { combineReducers } from 'redux';
import tweetReducer from './tweetReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  tweet: tweetReducer,
  auth: authReducer
});

export default rootReducer;

// https://qiita.com/numa999/items/4bb4e61918573149ab4b
export type RootState = ReturnType<typeof rootReducer>;
