import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { fetchJsonWrapper } from './helpers/fetchJsonWrapper';
import {
  RECEIVE_SEARCH_DATA,
  REQUEST_SEARCH_DATA,
  RECEIVE_SEARCH_DATA_FAILED,
  REQUEST_SHOW_MORE
} from '../constants/actionTypes';

/*
* @description Passes the redux action's `url` through to fetchJsonWrapper().
* Passes server error and failed action through via RECEIVE_SEARCH_DATA_FAILED action */

export function* fetchData( action ) {
  try {
    const receivedData = yield call( fetchJsonWrapper, action.payload.url );

    if ( receivedData.ok ) {
      yield put({
        type: RECEIVE_SEARCH_DATA,
        payload: {
          receivedData: receivedData,
          searchTerm: action.payload.searchTerm
        }
      });
    } else {
      throw receivedData;
    }

  } catch(err) {

    yield put({
      type: RECEIVE_SEARCH_DATA_FAILED,
      payload: { error: err, failedAction: action }
    });
    //console.log( 'An error happenned :/', err );
  }
}

/*
* @description Listens for when an actionTypes.REQUEST_SEARCH_DATA action is fired
* It calls fetchData() everytime it does.
* It passes in the redux action payload with it to the fetchData() function above.

* Note: I am using `takeEvery` here as I presume multiple requests may be made concurrently.
* i.e. In a real world example, I might need to call multiple endpoints at the same time */

export function* listenForDataRequests() {
  yield* takeEvery( REQUEST_SEARCH_DATA, fetchData );
}

export function* listenForShowMoreRequests() {
  yield* takeEvery( REQUEST_SHOW_MORE, fetchData );
}
