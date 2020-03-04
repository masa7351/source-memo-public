import { firebaseAuth, fireStore, serverTime } from '../../config/firebase';
import { Dispatch, Action } from 'redux';
import {
  RECEIVE_USER,
  LOGOUT,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  AuthActionTypes,
  START_LOADING_USER,
  FINISH_LOADING_USER
} from '../consts/authConsts';
import {
  saveUserToStorage,
  getUserFromStorage,
  removeUser
} from '../utils/storage';
import { AppThunk, User } from '../../types';
import * as Path from '../../paths';

// thunks

export const loginUser = (
  email: string,
  password: string
): AppThunk<void> => async (dispatch: Dispatch<Action>) => {
  try {
    startLoadingUser();
    const auth = await firebaseAuth.signInWithEmailAndPassword(email, password);
    const user = auth.user;
    if (user) {
      saveUserToStorage(user);
      await _getUser(dispatch);
    } else {
      dispatch(loginFailure());
    }
  } catch (err) {
    console.error(err);
  }
};

export const createUser = (
  email: string,
  password: string,
  name: string
): AppThunk<void> => async (dispatch: Dispatch<Action>) => {
  try {
    const auth = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const authUser = auth.user;
    if (authUser) {
      await _createUser(authUser.uid, name || 'Unknown');
      saveUserToStorage(authUser);
      startLoadingUser();
      await _getUser(dispatch);
    } else {
      dispatch(registerFailure('ユーザー作成に失敗しました。'));
    }
  } catch (err) {
    console.error(err);
    dispatch(registerFailure(err.message));
  }
};

const _createUser = async (userId: string, name: string) => {
  const newUser = {
    userId: userId,
    name: name,
    createTime: serverTime,
    updateTime: serverTime
  } as User;
  try {
    const docRef = fireStore.doc(Path.user(userId));
    await docRef.set(newUser);
  } catch (err) {
    console.error('Oops Something went wrong');
    console.error(err);
    throw err;
  }
};

export const getUser = (): AppThunk<void> => async (
  dispatch: Dispatch<Action>
) => {
  dispatch(startLoadingUser());
  await _getUser(dispatch);
};

const _getUser = async (dispatch: Dispatch<Action>) => {
  try {
    const authUser = getUserFromStorage();
    if (authUser) {
      const docRef = fireStore.doc(Path.user(authUser.uid));
      const snapshot = await docRef.get();
      const user = snapshot.data() as User;
      dispatch(receiveUser(user));
    } else {
      dispatch(finishLoadingUser());
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = (): AppThunk<void> => async (
  dispatch: Dispatch<Action>
) => {
  removeUser();
  await firebaseAuth.signOut();
  dispatch(_logout());
};

// Action Creator

const loginFailure = (): AuthActionTypes => {
  return {
    type: LOGIN_FAILURE
  };
};

const receiveUser = (user: User): AuthActionTypes => {
  return {
    type: RECEIVE_USER,
    payload: user
  };
};

const _logout = (): AuthActionTypes => {
  return {
    type: LOGOUT
  };
};

const registerFailure = (message: string): AuthActionTypes => {
  return {
    type: REGISTER_FAILURE,
    payload: message
  };
};

const startLoadingUser = (): AuthActionTypes => {
  return {
    type: START_LOADING_USER
  };
};

const finishLoadingUser = (): AuthActionTypes => {
  return {
    type: FINISH_LOADING_USER
  };
};
