import { eventChannel, TakeableChannel } from 'redux-saga';
import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  take,
  TakeEffect,
  takeEvery,
} from 'redux-saga/effects';

import { createWebSocketConnection } from 'helpers/webSocketConnection';
import {
  QUEUE_REQUEST_GET,
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_REMOVE,
  QUEUE_SET,
} from 'state/queue/actions';
import { LIST_REQUEST_GET, LIST_ADD, LIST_SET } from 'state/songlist/actions';
import { RootAction } from 'state/types';

const createChannel = (socket: WebSocket): TakeableChannel<RootAction> =>
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

function* processChannelEvent(
  action: RootAction
): Generator<PutEffect<RootAction>, void, never> {
  yield put(action);
}

function* initWebSocket(): Generator<
  | TakeEffect
  | CallEffect<WebSocket>
  | CallEffect<TakeableChannel<RootAction>>
  | ForkEffect,
  void,
  never
> {
  yield take([LIST_REQUEST_GET, QUEUE_REQUEST_GET]);

  const socket = (yield call(createWebSocketConnection)) as WebSocket;
  const channel = (yield call(createChannel, socket)) as TakeableChannel<
    RootAction
  >;

  yield takeEvery(channel, processChannelEvent);
}

export default initWebSocket;
