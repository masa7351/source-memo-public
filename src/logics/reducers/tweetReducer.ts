import {
  RECEIVE_TWEETS,
  RECEIVE_MY_TWEETS,
  SET_CURRENT_TWEET,
  SET_UPLOAD_IMAGE,
  SET_UPLOAD_IMAGES,
  SET_BLOBS_PATH,
  CLEAR_BLOBS_PATH,
  CLEAR_UPLOADED_IMAGES,
  TweetActionTypes
} from '../consts/tweetConsts';
import { TweetState } from '../../types';

const initialState: TweetState = {
  tweets: [],
  myTweets: [],
  current: null,
  uploadedImagesPath: [],
  blobsPath: []
};

const testReducer = (
  state = initialState,
  action: TweetActionTypes
): TweetState => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        tweets: action.payload
      };
    case RECEIVE_MY_TWEETS:
      return {
        ...state,
        myTweets: action.payload
      };
    case SET_CURRENT_TWEET:
      return {
        ...state,
        current: action.payload
      };
    case SET_UPLOAD_IMAGES:
      return {
        ...state,
        uploadedImagesPath: action.payload.concat(state.uploadedImagesPath) // 新しい要素を先頭に追加
      };
    case SET_UPLOAD_IMAGE:
      return {
        ...state,
        uploadedImagesPath: [action.payload].concat(state.uploadedImagesPath) // 新しい要素を先頭に追加
      };
    case SET_BLOBS_PATH:
      return {
        ...state,
        blobsPath: action.payload
      };
    case CLEAR_BLOBS_PATH:
      return {
        ...state,
        blobsPath: []
      };
    case CLEAR_UPLOADED_IMAGES:
      return {
        ...state,
        uploadedImagesPath: []
      };
    default:
      return state;
  }
};

export default testReducer;
