import { TakeableChannel } from 'redux-saga';
import {
  call,
  CallEffect,
  cancel,
  CancelEffect,
  delay,
  fork,
  ForkEffect,
  put,
  PutEffect,
  take,
  TakeEffect,
  takeEvery,
} from 'redux-saga/effects';

import { RootAction } from 'state/types';

import {
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

function* keepSocketAlive(): Generator<CallEffect | PutEffect, void, never> {
  while (true) {
    yield delay(0.25 * 60 * 1000); // 5 mins
    yield put({ type: WS_SEND, payload: 'ping' });
  }
}

function* initialiseWebsocket(): Generator<
  TakeEffect | CallEffect | PutEffect | CancelEffect | ForkEffect,
  void,
  never
> {
  if (!process.env.GATSBY_WEBSOCKET_URL) {
    throw new Error('Websocket URL missing');
  }
  const socket = new WebSocket(process.env.GATSBY_WEBSOCKET_URL);
  const channel = (yield call(
    createWebsocketChannel,
    socket
  )) as TakeableChannel<RootAction>;
  yield takeEvery(channel, handleIncomingMessage);
  yield takeEvery(WS_SEND, handleOutgoingMessage, socket);

  const keepSocketAliveTask = yield fork(keepSocketAlive);

  yield take(WS_DISCONNECT);
  yield cancel(keepSocketAliveTask);
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
