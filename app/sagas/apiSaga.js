import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { fetchJsonWrapper } from './helpers/fetchJsonWrapper';
import getSearchTermQuery from '../helpers/getSearchTermQuery';
import * as actionTypes from '../constants/actionTypes';

/*
* @description Passes the redux action's `url` through to fetchJsonWrapper().
* Passes server error and failed action through via RECEIVE_SEARCH_DATA_FAILED action */

export function* fetchData( action ) {

  const { searchOffset, searchTerm } = action.payload;
  const apiKey = 'api_key=dc6zaTOxFJmzC';
  const query = getSearchTermQuery(searchTerm);
  const searchURL = `//api.giphy.com/v1/gifs/search?q=${query}&offset=${searchOffset}&${apiKey}`;

  try {
    const receivedData = yield call( fetchJsonWrapper, searchURL );

    if ( receivedData.ok ) {
      yield put({
        type: actionTypes.RECEIVE_SEARCH_DATA,
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
      type: actionTypes.RECEIVE_SEARCH_DATA_FAILED,
      payload: { error: err, failedAction: action }
    });
    //console.log( 'An error happenned :/', err );
  }
}

/*
* @description Listens for when an actionTypes.REQUEST_SEARCH_DATA action is fired
* It calls fetchData() everytime it does- passing in the redux action payload with it*/

export function* listenForDataRequests() {
  yield* takeEvery( actionTypes.REQUEST_SEARCH_DATA, fetchData );
}

export function* listenForShowMoreRequests() {
  yield* takeEvery( actionTypes.REQUEST_SHOW_MORE, fetchData );
}
