/* eslint-disable no-param-reassign */

import { toast } from 'react-toastify';
import { TakeableChannel, eventChannel } from 'redux-saga';

import { notifyError, notifySuccess } from 'helpers/notify';
import {
  QUEUE_ADD,
  QUEUE_BUMP,
  QUEUE_CANCEL,
  QUEUE_PLAYED,
} from 'state/queue/actions';
import { STATUS_SET } from 'state/requestStatus/actions';
import { LIST_ADD } from 'state/songlist/actions';
import { RootAction } from 'state/types';

type WebsocketHandler = (
  emitter: (a: RootAction) => void
) => (event: Event) => void;

const onOpen: WebsocketHandler = () => () => {
  notifySuccess('Websocket open!');
};

const onError: WebsocketHandler = () => event => {
  notifyError('Socket error', event);
};

const onClose: WebsocketHandler = () => () => {
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
      case 'queueAdd':
        return emitter({ type: QUEUE_ADD, payload: data.data });
      case 'queueBump':
        return emitter({ type: QUEUE_BUMP, payload: data.data });
      case 'queueCancel':
        return emitter({ type: QUEUE_CANCEL, payload: data.data });
      case 'queuePlayed':
        return emitter({ type: QUEUE_PLAYED, payload: data.data });
      case 'statusUpdate':
        return emitter({
          type: STATUS_SET,
          payload: { ...data.data, notify: true },
        });
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
