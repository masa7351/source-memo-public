import { Action } from 'redux';
import { User } from '../../types';

export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;
export const LOGOUT = 'LOGOUT' as const;
export const START_LOADING_USER = 'START_LOADING_USER' as const;
export const FINISH_LOADING_USER = 'FINISH_LOADING_USER' as const;
export const RECEIVE_USER = 'RECEIVE_USER' as const;
export const RECEIVE_USER_SOCIAL = 'RECEIVE_USER_SOCIAL' as const;
export const REGISTER_FAILURE = 'REGISTER_FAILURE' as const;

interface LoginFailureAction extends Action {
  type: typeof LOGIN_FAILURE;
}

interface ReceiveUserAction extends Action {
  type: typeof RECEIVE_USER;
  payload: User;
}

// TODO: UserとUserSocialを将来的に分離するので、そのときに差し替える。
// 理由としては、Userに登録されているサムネイルや名前などを更新したときに、登録されているドキュメントを更新するのに
// Cloud Functionsを使いたいが、Userに更新頻度の高い情報を含めると都度Cloud Functionsが実行されてしまうためです。
interface ReceiveUserSocialAction extends Action {
  type: typeof RECEIVE_USER_SOCIAL;
  payload: User;
}

interface LogoutAction extends Action {
  type: typeof LOGOUT;
}

interface RegisterFailureAction extends Action {
  type: typeof REGISTER_FAILURE;
  payload: string;
}

interface StartLoadingUserAction extends Action {
  type: typeof START_LOADING_USER;
}

interface FinishLoadingUserAction extends Action {
  type: typeof FINISH_LOADING_USER;
}

export type AuthActionTypes =
  | LoginFailureAction
  | ReceiveUserAction
  | LogoutAction
  | RegisterFailureAction
  | StartLoadingUserAction
  | FinishLoadingUserAction
  | ReceiveUserSocialAction;
