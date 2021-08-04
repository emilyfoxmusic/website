class WebSocketWrapper {
  websocket: WebSocket | null = null;

  queue: string[] = [];

  init(websocket: WebSocket): void {
    this.websocket = websocket;
    this.queue.forEach(message => {
      websocket.send(message);
    });
    this.queue = [];
  }

  send<T>(data: T): void {
    const message = JSON.stringify(data);
    if (this.websocket && this.websocket.readyState === 1) {
      this.websocket.send(message);
    } else {
      this.queue.push(message);
    }
  }
}

export const webSocket = new WebSocketWrapper();

export const createWebSocketConnection = (): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(
      'wss://kywvvmz6va.execute-api.eu-west-2.amazonaws.com/dev'
    );

    socket.onopen = () => {
      console.info('Socket open');
      webSocket.init(socket);
      resolve(socket);
    };

    socket.onerror = event => {
      reject(event);
    };
  });
};
