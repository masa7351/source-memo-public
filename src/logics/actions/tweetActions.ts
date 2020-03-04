import {
  fireStore,
  firebaseAuth,
  fireStorage,
  serverTime
} from '../../config/firebase';
import { Dispatch, Action } from 'redux';
import {
  SET_CURRENT_TWEET,
  RECEIVE_TWEETS,
  SET_UPLOAD_IMAGE,
  SET_UPLOAD_IMAGES,
  SET_BLOBS_PATH,
  CLEAR_BLOBS_PATH,
  CLEAR_UPLOADED_IMAGES,
  TweetActionTypes,
  RECEIVE_MY_TWEETS
} from '../consts/tweetConsts';
import { Tweet, AppThunk, DetachSetter } from '../../types';
import { AuthError } from '../../customErrors';
import * as Path from '../../paths';

export const createTweet = (
  uid: string,
  title: string,
  content: string,
  keyword: string
): AppThunk<void> => async (dispatch: Dispatch<Action>) => {
  const userDocRef = fireStore.doc(Path.user(uid));
  const tweet = {
    userId: uid,
    title: title,
    content: content,
    keyword: keyword,
    author: userDocRef,
    createTime: serverTime,
    updateTime: serverTime
  } as Tweet;
  try {
    await fireStore.collection(Path.userTweets(uid)).add(tweet);
  } catch (err) {
    console.error('Oops Something went wrong');
    console.error(err);
  }
};

export const updateTweet = (tweet: Tweet): AppThunk<void> => async (
  dispatch: Dispatch<Action>
) => {
  try {
    const docRef = fireStore.doc(Path.userTweet(tweet.userId, tweet.id));
    const newTweet = {
      ...tweet,
      updateTime: serverTime
    } as Tweet;
    await docRef.update(newTweet);
    dispatch(setCurrentTweet(null));
  } catch (err) {
    console.error('Oops Updating Data failed');
    console.error(err);
  }
};

export const deleteTweet = (
  tweetId: string,
  userId: string
): AppThunk<void> => async (dispatch: Dispatch<Action>) => {
  try {
    const docRef = fireStore.doc(Path.userTweet(userId, tweetId));
    await docRef.delete();
  } catch (err) {
    console.error('Oops Deleting Data failed');
    console.error(err);
  }
};

export const subscribeTweets = (
  setUnsubscribe: DetachSetter
): AppThunk<void> => async (dispatch: Dispatch<Action>) => {
  try {
    const colRef = fireStore.collectionGroup(Path.tweets);
    // onSnapshot
    // https://qiita.com/k_tada/items/ed05d14458d1ddfcefae
    // https://qiita.com/KoheiAsano/items/7c4444328b65feed5b21
    const unsubscribe = colRef
      .orderBy('createTime', 'desc')
      .onSnapshot(snapshot => {
        let result: Tweet[] = [];
        snapshot.docs.forEach(doc => {
          const tweet = doc.data() as Tweet;
          result.push({ ...tweet, id: doc.id });
        });
        dispatch(receiveTweets(result));
      });
    setUnsubscribe(unsubscribe);
  } catch (err) {
    console.error(err);
  }
};

export const subscribeMyTweets = (
  userId: string,
  setUnsubscribe: DetachSetter
): AppThunk<void> => async (dispatch: Dispatch<Action>) => {
  try {
    const colRef = fireStore.collection(Path.userTweets(userId));
    const unsubscribe = colRef
      .where('userId', '==', userId)
      .orderBy('createTime', 'desc')
      .onSnapshot(snapshot => {
        let result: Tweet[] = [];
        snapshot.docs.forEach(doc => {
          const tweet = doc.data() as Tweet;
          result.push({ ...tweet, id: doc.id });
        });
        dispatch(receiveMyTweets(result));
      });
    setUnsubscribe(unsubscribe);
  } catch (err) {
    console.error(err);
  }
};

export const setCurrentTweet = (tweet: Tweet | null): TweetActionTypes => ({
  type: SET_CURRENT_TWEET,
  payload: tweet
});

export const setUploadingImages = (blobsPath: string[]): TweetActionTypes => ({
  type: SET_BLOBS_PATH,
  payload: blobsPath
});

export const uploadImage = (file: File): AppThunk<void> => async (
  dispatch: Dispatch<Action>
) => {
  try {
    const downloadURL = await _uploadImage(file);
    dispatch(setUploadImage(downloadURL));
    dispatch(clearBlobsPath());
  } catch (err) {
    console.error(err);
    dispatch(clearBlobsPath());
  }
};

export const uploadImages = (files: File[]): AppThunk<void> => async (
  dispatch: Dispatch<Action>
) => {
  try {
    const downloadURLs = await Promise.all(
      files.map(async file => {
        return _uploadImage(file);
      })
    );
    dispatch(setUploadImages(downloadURLs));
    dispatch(clearBlobsPath());
  } catch (err) {
    console.error(err);
    dispatch(clearBlobsPath());
  }
};

export const clearUploadedImages = (): TweetActionTypes => ({
  type: CLEAR_UPLOADED_IMAGES
});

export const clearBlobsPath = (): TweetActionTypes => {
  return {
    type: CLEAR_BLOBS_PATH
  };
};

const _uploadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = firebaseAuth.currentUser;

    if (user == null) {
      const authError = new AuthError("can't load user info");
      reject(authError);
      return;
    }

    const path = `${user.uid}/tweet_images`;
    const ex = file.name.match(/\.(\w{3,4})/);

    const storageRef = fireStorage.ref();
    storageRef
      .child(path)
      .child(`${Date.now()}.${ex ? ex[1] : 'png'}`)
      .put(file, { contentType: file.type })
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          resolve(downloadURL);
        });
      })
      .catch(error => {
        // error
        console.error(error);
        reject(new Error(error));
      });
  });
};

const receiveTweets = (tweets: Tweet[]): TweetActionTypes => {
  return {
    type: RECEIVE_TWEETS,
    payload: tweets
  };
};

const receiveMyTweets = (tweets: Tweet[]): TweetActionTypes => {
  return {
    type: RECEIVE_MY_TWEETS,
    payload: tweets
  };
};

const setUploadImages = (imagesPath: string[]): TweetActionTypes => {
  return {
    type: SET_UPLOAD_IMAGES,
    payload: imagesPath
  };
};

const setUploadImage = (imagePath: string): TweetActionTypes => {
  return {
    type: SET_UPLOAD_IMAGE,
    payload: imagePath
  };
};
