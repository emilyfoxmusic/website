import { ListItem } from './types';

export const LIST_REQUEST_GET = 'LIST_REQUEST_GET';
export const LIST_SET = 'LIST_SET';

export const LIST_REQUEST_ADD = 'LIST_REQUEST_ADD';
export const LIST_ADD = 'LIST_ADD';

export type ListRequestGetAction = {
  type: typeof LIST_REQUEST_GET;
};

export type ListSetAction = {
  type: typeof LIST_SET;
  payload: ListItem[];
};

export type ListRequestAddAction = {
  type: typeof LIST_REQUEST_ADD;
  payload: {
    title: string;
    artist: string;
  };
};

export type ListAddAction = {
  type: typeof LIST_ADD;
  payload: ListItem;
};

export type ListAction =
  | ListRequestGetAction
  | ListSetAction
  | ListRequestAddAction
  | ListAddAction;
