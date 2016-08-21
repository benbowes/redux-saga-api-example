/*
* @requires Redux Saga needs to be polyfilled by npm module `babel-polyfill`
* see app/index.js */

import { fork } from 'redux-saga/effects';
import { listenForDataRequests, listenForShowMoreRequests } from './apiSaga';

/*
* @description This is our entry function.
* It's fired in store/configureStore after middleware is applied */

export function* rootSaga() {
  yield [
    fork(listenForDataRequests),
    fork(listenForShowMoreRequests)
  ]; // fork the sagas we want to init at application `firstload`
}
