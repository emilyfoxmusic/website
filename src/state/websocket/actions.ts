export const WS_CONNECT = 'WS_CONNECT';
export const WS_SEND = 'WS_SEND';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_CLOSED = 'WS_CLOSED';
export const WS_ERROR = 'WS_ERROR';

export type WebsocketConnectAction = {
  type: typeof WS_CONNECT;
  payload?: {
    code: string;
  };
};

export type WebsocketSendAction<T> = {
  type: typeof WS_SEND;
  payload: T;
};

export type WebsocketDisconnectAction = {
  type: typeof WS_DISCONNECT;
};

export type WebsocketClosedAction = {
  type: typeof WS_CLOSED;
};

export type WebsocketErrorAction = {
  type: typeof WS_ERROR;
};

export type WebsocketAction =
  | WebsocketConnectAction
  | WebsocketSendAction<unknown>
  | WebsocketDisconnectAction
  | WebsocketClosedAction
  | WebsocketErrorAction;
