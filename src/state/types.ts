import { QueueAction } from './queue/actions';
import reducer from './reducer';
import { RequestStatusAction } from './requestStatus/actions';
import { ListAction } from './songlist/actions';
import { UserAction } from './user/actions';
import { WebsocketAction } from './websocket/actions';

export type RootState = ReturnType<typeof reducer>;
export type RootAction =
  | ListAction
  | QueueAction
  | WebsocketAction
  | UserAction
  | RequestStatusAction;
