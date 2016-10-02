import 'babel-polyfill'; // required by redux-saga for generator func's
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import BaseComponent from './BaseComponent';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BaseComponent />
  </Provider>,
  document.getElementById('root')
);
