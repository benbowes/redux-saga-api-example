/*
* @requires Redux Saga needs to be polyfilled by npm module `babel-polyfill`
* see app/index.js */
import { call, fork, put, select } from 'redux-saga/effects';
import { listenForDataRequests, listenForShowMoreRequests } from './apiSaga';
import { listenForGifModalImageRequests } from './gifModalImagesSaga';
import { REQUEST_SEARCH_DATA } from '../constants/actionTypes';

export function* bootstrap() {
  // Grab state from Redux
  const searchOffset = yield select( state => state.imageSearch.searchOffset );
  const searchTerm = yield select( state => state.imageSearch.searchTerm );

  // Do first data load
  yield put({ type: REQUEST_SEARCH_DATA, payload: { searchOffset, searchTerm } });
}

/*
* @description This is our entry function.
* It's fired in store/configureStore after middleware is applied */
export function* rootSaga() {
  yield [
    fork(listenForDataRequests),
    fork(listenForShowMoreRequests),
    fork(listenForGifModalImageRequests)
  ]; // fork the sagas we want to init at application `firstload`

  yield call( bootstrap );
}
