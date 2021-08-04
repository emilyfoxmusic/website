import { ListItem } from './types';

export const LIST_REQUEST_GET = 'LIST_REQUEST_GET';
export const LIST_SET = 'LIST_SET';

export const LIST_REQUEST_ADD = 'LIST_REQUEST_ADD';
export const LIST_ADD = 'LIST_ADD';

export type ListAction =
  | {
      type: typeof LIST_REQUEST_GET;
    }
  | {
      type: typeof LIST_SET;
      payload: ListItem[];
    }
  | {
      type: typeof LIST_REQUEST_ADD;
      payload: {
        title: string;
        artist: string;
      };
    }
  | {
      type: typeof LIST_ADD;
      payload: ListItem;
    };
