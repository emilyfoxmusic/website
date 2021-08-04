/* eslint-disable no-param-reassign */

import { toast } from 'react-toastify';
import { TakeableChannel, eventChannel } from 'redux-saga';

import {
  QUEUE_REQUEST_GET,
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_SET,
  QUEUE_CANCEL,
  QUEUE_PLAYED,
} from 'state/queue/actions';
import { LIST_REQUEST_GET, LIST_ADD, LIST_SET } from 'state/songlist/actions';
import { RootAction } from 'state/types';
import { SET_USER, USER_REQUEST_GET } from 'state/user/actions';

type WebsocketHandler = (
  emitter: (a: RootAction) => void
) => (event: Event) => void;

const onOpen: WebsocketHandler = emitter => event => {
  console.info('Socket open', event);
  toast.success('Websocket open!');

  emitter({ type: USER_REQUEST_GET });
  emitter({ type: LIST_REQUEST_GET });
  emitter({ type: QUEUE_REQUEST_GET });
};

const onError: WebsocketHandler = () => event => {
  console.info('Socket error', event);
  toast.error(
    'There was a communications error - you may need to refresh the page.'
  );
};

const onClose: WebsocketHandler = () => event => {
  console.info('Socket closed', event);
  toast.warn('Websocket closed');
};

const onMessage = (emitter: (a: RootAction) => void) => (event: {
  data: string;
}): void => {
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
      case 'getUser':
        return emitter({ type: SET_USER, payload: data.data });
      default:
        console.warn('Unknown message received from websocket');
    }
  } catch (error) {
    console.error('Error while processing websocket message', event, error);
  }
  return undefined;
};

export const createWebsocketChannel = (
  socket: WebSocket
): TakeableChannel<RootAction> =>
  eventChannel(emitter => {
    socket.onopen = onOpen(emitter);
    socket.onerror = onError(emitter);
    socket.onclose = onClose(emitter);
    socket.onmessage = onMessage(emitter);
    return () => {
      socket.onopen = () => {};
      socket.onerror = () => {};
      socket.onclose = () => {};
      socket.onmessage = () => {};
    };
  });
