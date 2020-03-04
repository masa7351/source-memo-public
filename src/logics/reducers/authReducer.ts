import {
  LOGIN_FAILURE,
  RECEIVE_USER,
  LOGOUT,
  START_LOADING_USER,
  FINISH_LOADING_USER,
  REGISTER_FAILURE,
  RECEIVE_USER_SOCIAL,
  AuthActionTypes
} from '../consts/authConsts';
import { AuthState } from '../../types';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoadingUser: true,
  user: null,
  errorMessage: null
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        isAuthenticated: true,
        isLoadingUser: false,
        user: action.payload,
        errorMessage: null
      };
    case LOGIN_FAILURE:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: null
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    case START_LOADING_USER:
      return {
        ...state,
        isLoadingUser: true
      };
    case FINISH_LOADING_USER:
      return {
        ...state,
        isLoadingUser: false
      };
    case RECEIVE_USER_SOCIAL:
      return {
        ...state,
        isAuthenticated: true,
        isLoadingUser: false,
        user: action.payload,
        errorMessage: null
      };
    default:
      return state;
  }
};

export default authReducer;
