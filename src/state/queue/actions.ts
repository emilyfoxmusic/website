import { QueueItem } from './types';

export const QUEUE_REQUEST_GET = 'QUEUE_REQUEST_GET';
export const QUEUE_SET = 'QUEUE_SET';

export const QUEUE_REQUEST_PLAYED = 'QUEUE_REQUEST_PLAYED';
export const QUEUE_REQUEST_CANCEL = 'QUEUE_REQUEST_CANCEL';
export const QUEUE_REMOVE = 'QUEUE_REMOVE';

export const QUEUE_REQUEST_ADD = 'QUEUE_REQUEST_ADD';
export const QUEUE_ADD = 'QUEUE_ADD';

export const QUEUE_REQUEST_BUMP = 'QUEUE_REQUEST_BUMP';
export const QUEUE_BUMP = 'QUEUE_BUMP';

export type QueueAction =
  | {
      type: typeof QUEUE_REQUEST_GET;
    }
  | {
      type: typeof QUEUE_SET;
      payload: QueueItem[];
    }
  | {
      type:
        | typeof QUEUE_REQUEST_PLAYED
        | typeof QUEUE_REQUEST_CANCEL
        | typeof QUEUE_REMOVE
        | typeof QUEUE_REQUEST_ADD;
      payload: {
        songId: string;
      };
    }
  | {
      type: typeof QUEUE_ADD;
      payload: QueueItem;
    }
  | {
      type: typeof QUEUE_REQUEST_BUMP;
      payload: {
        songId: string;
        position: number;
      };
    }
  | {
      type: typeof QUEUE_BUMP;
      payload: {
        songId: string;
        priority: string;
      };
    };
