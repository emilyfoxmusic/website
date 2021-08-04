export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const USER_REQUEST_GET = 'USER_REQUEST_GET';

export type AuthenticateAction = {
  type: typeof AUTHENTICATE;
  payload: {
    code: string;
  };
};

export type SetUserAction = {
  type: typeof SET_USER;
  payload: {
    username: string;
  };
};

export type ClearUserAction = {
  type: typeof CLEAR_USER;
};

export type UserRequestGetAction = {
  type: typeof USER_REQUEST_GET;
};

export type UserAction =
  | AuthenticateAction
  | SetUserAction
  | ClearUserAction
  | UserRequestGetAction;
