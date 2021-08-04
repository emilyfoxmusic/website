import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'state/reducer';

const StoreProvider: React.FC = ({ children }) => {
  const store = createStore(reducer, composeWithDevTools());
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
