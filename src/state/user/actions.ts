import { Principal } from './types';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_REFRESH = 'AUTHENTICATE_REFRESH';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const USER_REQUEST_GET = 'USER_REQUEST_GET';
export const LOAD_AUTHENTICATION = 'LOAD_AUTHENTICATION';

export type AuthenticateAction = {
  type: typeof AUTHENTICATE;
  payload: {
    code: string;
    state: string;
  };
};

export type AuthenticateRefreshAction = {
  type: typeof AUTHENTICATE_REFRESH;
  payload: {
    code: string;
    state: string;
  };
};

export type SetUserAction = {
  type: typeof SET_USER;
  payload: Principal;
};

export type ClearUserAction = {
  type: typeof CLEAR_USER;
};

export type UserRequestGetAction = {
  type: typeof USER_REQUEST_GET;
};

export type LoadAuthenticationAction = {
  type: typeof LOAD_AUTHENTICATION;
};

export type UserAction =
  | AuthenticateAction
  | AuthenticateRefreshAction
  | SetUserAction
  | ClearUserAction
  | UserRequestGetAction
  | LoadAuthenticationAction;
