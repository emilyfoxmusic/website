import { UserAction } from './user/actions';
import { QueueAction } from './queue/actions';
import reducer from './reducer';
import { ListAction } from './songlist/actions';
import { WebsocketAction } from './websocket/actions';

export type RootState = ReturnType<typeof reducer>;
export type RootAction =
  | ListAction
  | QueueAction
  | WebsocketAction
  | UserAction;
