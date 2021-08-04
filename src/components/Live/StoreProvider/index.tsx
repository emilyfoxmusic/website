import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from 'state/reducer';
import initWebSocketSaga from 'state/sagas/initWebSocket';
import listManagementSaga from 'state/sagas/listManagement';
import notificationsSaga from 'state/sagas/notificationsSaga';
import queueManagementSaga from 'state/sagas/queueManagement';

const StoreProvider: React.FC = ({ children }) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(initWebSocketSaga);
  sagaMiddleware.run(listManagementSaga);
  sagaMiddleware.run(queueManagementSaga);
  sagaMiddleware.run(notificationsSaga);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
