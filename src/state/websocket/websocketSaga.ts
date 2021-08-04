import { TakeableChannel } from 'redux-saga';
import {
  all,
  AllEffect,
  call,
  CallEffect,
  CancelEffect,
  ForkEffect,
  put,
  PutEffect,
  take,
  TakeEffect,
  takeEvery,
} from 'redux-saga/effects';

import { RootAction } from 'state/types';

import {
  WebsocketConnectAction,
  WebsocketSendAction,
  WS_CONNECT,
  WS_DISCONNECT,
  WS_SEND,
} from './actions';
import { createWebsocketChannel } from './channel';

function* handleIncomingMessage(
  action: RootAction
): Generator<PutEffect, void, never> {
  yield put(action);
}

const socketSend = (socket: WebSocket, data: unknown): void => {
  socket.send(JSON.stringify(data));
};

function* handleOutgoingMessage(
  socket: WebSocket,
  action: WebsocketSendAction<unknown>
): Generator<CallEffect, void, never> {
  yield call(socketSend, socket, action.payload);
}

const socketClose = (socket: WebSocket): void => {
  socket.close();
};

function* closeWebsocket(
  socket: WebSocket
): Generator<CallEffect, void, never> {
  yield call(socketClose, socket);
}

function* initialiseWebsocket(
  action: WebsocketConnectAction
): Generator<
  AllEffect<unknown> | TakeEffect | CallEffect | PutEffect,
  void,
  never
> {
  const socket = new WebSocket(
    `${process.env.GATSBY_WEBSOCKET_URL}?auth=${action.payload?.code ?? 'anon'}`
  );
  const channel = (yield call(
    createWebsocketChannel,
    socket
  )) as TakeableChannel<RootAction>;
  yield all([
    takeEvery(channel, handleIncomingMessage),
    takeEvery(WS_SEND, handleOutgoingMessage, socket),
  ]);
  yield take(WS_DISCONNECT);
  yield call(closeWebsocket, socket);
}

function* websocketSaga(): Generator<
  TakeEffect | ForkEffect | CancelEffect,
  void,
  never
> {
  yield takeEvery(WS_CONNECT, initialiseWebsocket);
}

export default websocketSaga;
