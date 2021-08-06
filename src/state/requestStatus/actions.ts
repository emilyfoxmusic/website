import { RequestStatus } from './types';

export const STATUS_REQUEST_GET = 'STATUS_REQUEST_GET';
export const STATUS_SET = 'STATUS_SET';

export const STATUS_REQUEST_UPDATE = 'STATUS_REQUEST_UPDATE';

export type StatusRequestGetAction = {
  type: typeof STATUS_REQUEST_GET;
};

export type StatusSetAction = {
  type: typeof STATUS_SET;
  payload: RequestStatus & { notify: boolean };
};

export type StatusRequestUpdateAction = {
  type: typeof STATUS_REQUEST_UPDATE;
  payload: RequestStatus;
};

export type RequestStatusAction =
  | StatusRequestGetAction
  | StatusSetAction
  | StatusRequestUpdateAction;
