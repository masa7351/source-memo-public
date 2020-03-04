import { Tweet } from '../../types';
import { Action } from 'redux';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS' as const;
export const RECEIVE_MY_TWEETS = 'RECEIVE_MY_TWEETS' as const;
export const SET_CURRENT_TWEET = 'SET_CURRENT_TWEET' as const;
export const SET_UPLOAD_IMAGES = 'SET_UPLOAD_IMAGES' as const;
export const SET_UPLOAD_IMAGE = 'SET_UPLOAD_IMAGE' as const;
export const SET_BLOBS_PATH = 'SET_BLOBS_PATH' as const;
export const CLEAR_BLOBS_PATH = 'CLEAR_BLOBS_PATH' as const;
export const CLEAR_UPLOADED_IMAGES = 'CLEAR_UPLOADED_IMAGES' as const;

interface ReceiveTweetsAction extends Action {
  type: typeof RECEIVE_TWEETS;
  payload: Tweet[];
}

interface ReceiveMyTweetsAction extends Action {
  type: typeof RECEIVE_MY_TWEETS;
  payload: Tweet[];
}

interface SetCurrentTweetAction extends Action {
  type: typeof SET_CURRENT_TWEET;
  payload: Tweet | null;
}

interface SetUploadImagesAction extends Action {
  type: typeof SET_UPLOAD_IMAGES;
  payload: string[];
}

interface SetUploadImageAction extends Action {
  type: typeof SET_UPLOAD_IMAGE;
  payload: string;
}

interface SetBlobsPathAction extends Action {
  type: typeof SET_BLOBS_PATH;
  payload: string[];
}

interface ClearBlobsPathAction extends Action {
  type: typeof CLEAR_BLOBS_PATH;
}

interface ClearUploadedPathAction extends Action {
  type: typeof CLEAR_UPLOADED_IMAGES;
}

export type TweetActionTypes =
  | ReceiveTweetsAction
  | ReceiveMyTweetsAction
  | SetCurrentTweetAction
  | SetUploadImagesAction
  | SetUploadImageAction
  | SetBlobsPathAction
  | ClearBlobsPathAction
  | ClearUploadedPathAction;
