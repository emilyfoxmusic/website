import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from 'state/reducer';
import websocketListRequestSaga from 'state/websocketListRequestSaga';
import websocketListenerSaga from 'state/websocketListenerSaga';

const StoreProvider: React.FC = ({ children }) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(websocketListenerSaga);
  sagaMiddleware.run(websocketListRequestSaga);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
