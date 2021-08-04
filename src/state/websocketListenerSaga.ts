import { eventChannel, TakeableChannel } from 'redux-saga';
import {
  call,
  CallEffect,
  ChannelTakeEffect,
  put,
  PutEffect,
  take,
} from 'redux-saga/effects';

import {
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_REMOVE,
  QUEUE_SET,
} from './queue/actions';
import { LIST_ADD, LIST_SET } from './songlist/actions';
import { RootAction } from './types';

// eslint-disable-next-line import/no-mutable-exports
export let ws: WebSocket;

const createWebSocketConnection = (): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('wss://');

    socket.onopen = () => {
      ws = socket;
      resolve(socket);
    };

    socket.onerror = evt => {
      reject(evt);
    };
  });
};

const createSocketChannel = (socket: WebSocket): TakeableChannel<RootAction> =>
  eventChannel(emitter => {
    // eslint-disable-next-line no-param-reassign
    socket.onmessage = event => {
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
          case 'queueRemove':
            return emitter({ type: QUEUE_REMOVE, payload: data.data });
          default:
            console.warn('Unknown message received from websocket');
        }
      } catch (error) {
        console.error('Error while processing websocket message', event, error);
      }
      return () => {};
    };

    return () => {
      socket.close();
    };
  });

function* websocketListenerSaga(): Generator<
  | CallEffect<WebSocket>
  | CallEffect<TakeableChannel<RootAction>>
  | PutEffect<RootAction>
  | ChannelTakeEffect<RootAction>,
  void,
  WebSocket | TakeableChannel<RootAction> | RootAction
> {
  const socket = (yield call(createWebSocketConnection)) as WebSocket;
  const channel = (yield call(createSocketChannel, socket)) as TakeableChannel<
    RootAction
  >;

  while (true) {
    const action = (yield take<RootAction>(channel)) as RootAction;
    yield put(action);
  }
}

export default websocketListenerSaga;
