import { AuthActionTypes } from './logics/consts/authConsts';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './logics/reducers/rootReducer';
import { TweetActionTypes } from './logics/consts/tweetConsts';

import firebase from 'firebase/app';
import 'firebase/firestore';

/**
 * Firebase Cloud Firestore types
 */

export type IncrementableNumber = number | firebase.firestore.FieldValue;
export type ServerTimestamp =
  | firebase.firestore.Timestamp
  | firebase.firestore.FieldValue;
export type DocumentReference = firebase.firestore.DocumentReference;

/**
 * Detach onSnapshot
 * parameter: unsubscribe callback of onSnapshot
 */
export type DetachSetter = (_: () => void) => void;

/**
 * Cursor Click Axis
 */
export interface PositionRef {
  x: number;
  y: number;
}

/**
 * Image local path
 */
export interface BlobPreview extends File {
  preview: string; // path
}

/**
 * Cloud Firestore Collection
 *
 * Structure Design Reference:
 * https://tech-blog.sgr-ksmt.org/2019/12/31/160623/
 */

/**
 * path: /users/{user_id}
 */
export interface User {
  userId: string;
  name: string;
  // TODO: サムネイルの画像パスを追加する予定。
  createTime: ServerTimestamp;
  updateTime: ServerTimestamp;
}

// path: /users/{user_id}/tweets/{tweet_id}
export interface Tweet {
  id: string;
  userId: string;
  title: string;
  content: string;
  keyword: string;
  author: DocumentReference;
  createTime: ServerTimestamp;
  updateTime: ServerTimestamp;
}

// Store States

export interface AuthState {
  isAuthenticated: boolean; // ユーザーログイン済かどうか
  isLoadingUser: boolean; // Loading中にIndicatorで画面全体をカバーする
  user: User | null;
  errorMessage: string | null;
}

export interface TweetState {
  tweets: Tweet[];
  myTweets: Tweet[];
  current: Tweet | null;
  uploadedImagesPath: string[];
  blobsPath: string[];
}
/**
 * 第一引数がDispatchされたActionの戻り値型
 * 第二引数がStateの型
 * 第三引数はdispatchとgetStateの他にもうひとつ取れる引数の型
 * 第四引数がActionの型
 *
 * References:
 * https://redux.js.org/recipes/usage-with-typescript
 * https://qiita.com/IgnorantCoder/items/ac681c97eb8318a87bb3
 */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  AuthActionTypes | TweetActionTypes
>;
