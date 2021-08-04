import {
  put,
  PutEffect,
  takeEvery,
  ForkEffect,
  take,
  TakeEffect,
  call,
  CallEffect,
} from 'redux-saga/effects';

import {
  AUTHENTICATE,
  AuthenticateAction,
  USER_REQUEST_GET,
} from 'state/user/actions';
import {
  WebsocketConnectAction,
  WebsocketDisconnectAction,
  WS_CONNECT,
  WS_DISCONNECT,
  WS_SEND,
} from 'state/websocket/actions';

function* requestGetUser(): Generator<PutEffect, void, never> {
  yield put({ type: WS_SEND, payload: { action: 'getUser' } });
}

function* authenticate(
  action: AuthenticateAction
): Generator<
  | PutEffect<WebsocketConnectAction | WebsocketDisconnectAction>
  | TakeEffect
  | CallEffect,
  void,
  never
> {
  yield put({ type: WS_DISCONNECT });
  yield put({ type: WS_CONNECT, payload: action.payload });
  yield take(USER_REQUEST_GET);
  yield call(requestGetUser);
}

function* authSaga(): Generator<ForkEffect<never>, void, never> {
  yield takeEvery(AUTHENTICATE, authenticate);
}

export default authSaga;
