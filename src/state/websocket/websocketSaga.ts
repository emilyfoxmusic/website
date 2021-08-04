/* eslint-disable no-param-reassign */
import { toast } from 'react-toastify';
import { eventChannel, TakeableChannel } from 'redux-saga';
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
  takeLatest,
} from 'redux-saga/effects';

import { SET_USER } from 'state/auth/actions';
import {
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_SET,
  QUEUE_PLAYED,
  QUEUE_CANCEL,
  QUEUE_REQUEST_GET,
} from 'state/queue/actions';
import { LIST_ADD, LIST_REQUEST_GET, LIST_SET } from 'state/songlist/actions';
import { RootAction } from 'state/types';

import {
  WebsocketConnectAction,
  WebsocketSendAction,
  WS_CONNECT,
  WS_DISCONNECT,
  WS_SEND,
} from './actions';

const onMessage = (emitter: (a: RootAction) => void) => (event: {
  data: string;
}): void => {
  console.info('Socket event', event);
  try {
    const data = JSON.parse(event.data);
    switch (data.action) {
      case 'listAdd':
        return emitter({ type: LIST_ADD, payload: data.data });
      case 'listGet':
        return emitter({ type: LIST_SET, payload: data.data });
      case 'queueAdd':
        return emitter({ type: QUEUE_ADD, payload: data.data });
      case 'queueBump':
        return emitter({ type: QUEUE_BUMP, payload: data.data });
      case 'queueGet':
        return emitter({ type: QUEUE_SET, payload: data.data });
      case 'queueCancel':
        return emitter({ type: QUEUE_CANCEL, payload: data.data });
      case 'queuePlayed':
        return emitter({ type: QUEUE_PLAYED, payload: data.data });
      case 'setUser':
        return emitter({ type: SET_USER, payload: data.data });
      default:
        console.warn('Unknown message received from websocket');
    }
  } catch (error) {
    console.error('Error while processing websocket message', event, error);
  }
};

type WebsocketData = {
  channel: TakeableChannel<RootAction>;
  socket: WebSocket;
};

const createChannel = (code: string | undefined): WebsocketData => {
  const socket = new WebSocket(
    `${process.env.GATSBY_WEBSOCKET_URL}?auth=${code ?? 'anon'}`
  );

  return {
    channel: eventChannel(emitter => {
      socket.onopen = event => {
        console.info('Socket open', event);
        toast.success('Websocket open!');
        emitter({ type: LIST_REQUEST_GET });
        emitter({ type: QUEUE_REQUEST_GET });
      };

      socket.onerror = event => {
        console.info('Socket error', event);
        toast.error('Websocket error :(');
      };

      socket.onclose = event => {
        console.info('Socket closed', event);
        toast.warn('Websocket closed');
      };

      socket.onmessage = onMessage(emitter);

      return () => {
        console.info('Clearing up websocket...');
        socket.close();
      };
    }),
    socket,
  };
};

function* handleWebsocketMessage(
  action: RootAction
): Generator<PutEffect, void, never> {
  yield put(action);
}

const socketSend = (socket: WebSocket, data: unknown): void => {
  socket.send(JSON.stringify(data));
};

function* sendWebsocketMessage(
  socket: WebSocket,
  action: WebsocketSendAction<any>
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

function* connectWebsocket(
  action: WebsocketConnectAction
): Generator<
  AllEffect<unknown> | TakeEffect | CallEffect | PutEffect,
  void,
  never
> {
  const { channel, socket } = (yield call(
    createChannel,
    action.payload?.code
  )) as WebsocketData;
  yield all([
    takeEvery(channel, handleWebsocketMessage),
    takeEvery(WS_SEND, sendWebsocketMessage, socket),
  ]);
  // yield put({ type: LIST_REQUEST_GET });
  // yield put({ type: QUEUE_REQUEST_GET });
  yield take(WS_DISCONNECT);
  yield call(closeWebsocket, socket);
}

function* websocketSaga(): Generator<
  TakeEffect | ForkEffect | CancelEffect,
  void,
  never
> {
  yield takeLatest(WS_CONNECT, connectWebsocket);
}

export default websocketSaga;
