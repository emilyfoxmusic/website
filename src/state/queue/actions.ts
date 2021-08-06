import { QueueItem } from './types';

export const QUEUE_REQUEST_GET = 'QUEUE_REQUEST_GET';
export const QUEUE_SET = 'QUEUE_SET';

export const QUEUE_REQUEST_PLAYED = 'QUEUE_REQUEST_PLAYED';
export const QUEUE_PLAYED = 'QUEUE_PLAYED';

export const QUEUE_REQUEST_CANCEL = 'QUEUE_REQUEST_CANCEL';
export const QUEUE_CANCEL = 'QUEUE_CANCEL';

export const QUEUE_REQUEST_ADD = 'QUEUE_REQUEST_ADD';
export const QUEUE_ADD = 'QUEUE_ADD';

export const QUEUE_REQUEST_BUMP = 'QUEUE_REQUEST_BUMP';
export const QUEUE_BUMP = 'QUEUE_BUMP';

export type QueueRequestGetAction = {
  type: typeof QUEUE_REQUEST_GET;
};

export type QueueSetAction = {
  type: typeof QUEUE_SET;
  payload: QueueItem[];
};

export type QueueRequestPlayedAction = {
  type: typeof QUEUE_REQUEST_PLAYED;
  payload: {
    songId: string;
  };
};

export type QueueSetPlayedAction = {
  type: typeof QUEUE_PLAYED;
  payload: {
    songId: string;
    title: string;
    artist: string;
    numberOfPlays: number;
    lastPlayed: string;
  };
};

export type QueueRequestCancelAction = {
  type: typeof QUEUE_REQUEST_CANCEL;
  payload: {
    songId: string;
  };
};

export type QueueCancelAction = {
  type: typeof QUEUE_CANCEL;
  payload: {
    songId: string;
    title: string;
    artist: string;
  };
};

export type QueueRequestAddAction = {
  type: typeof QUEUE_REQUEST_ADD;
  payload: {
    songId: string;
  };
};

export type QueueAddAction = {
  type: typeof QUEUE_ADD;
  payload: QueueItem;
};

export type QueueRequestBumpAction = {
  type: typeof QUEUE_REQUEST_BUMP;
  payload: {
    songId: string;
    position: number;
  };
};

export type QueueBumpAction = {
  type: typeof QUEUE_BUMP;
  payload: {
    songId: string;
    title: string;
    artist: string;
    priority: string;
    position: number;
  };
};

export type QueueAction =
  | QueueRequestGetAction
  | QueueSetAction
  | QueueRequestPlayedAction
  | QueueSetPlayedAction
  | QueueRequestCancelAction
  | QueueCancelAction
  | QueueRequestAddAction
  | QueueAddAction
  | QueueRequestBumpAction
  | QueueBumpAction;
