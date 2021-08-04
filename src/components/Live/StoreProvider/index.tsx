import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import notificationsSaga from 'state/notificationsSaga';
import queueManagementSaga from 'state/queue/queueManagementSaga';
import reducer from 'state/reducer';
import listManagementSaga from 'state/songlist/listManagementSaga';
import authenticateSaga from 'state/user/authenticateSaga';
import websocketSaga from 'state/websocket/websocketSaga';

const StoreProvider: React.FC = ({ children }) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(websocketSaga);
  sagaMiddleware.run(listManagementSaga);
  sagaMiddleware.run(queueManagementSaga);
  sagaMiddleware.run(notificationsSaga);
  sagaMiddleware.run(authenticateSaga);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
