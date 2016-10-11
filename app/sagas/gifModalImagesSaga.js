import { takeEvery } from 'redux-saga';
import { put, call, take, fork, cancel } from 'redux-saga/effects';
import { fetchImageWrapper } from './asyncWrappers/fetchImage';
import * as actionTypes from '../constants/actionTypes';

export function* requestImage( action ) {
  const fetchImageTask = yield fork( fetchImage, action.payload.requestedImage );

  // Cancels the load task if action type GIF_MODAL_CANCEL_REQUEST_IMAGE is dispatched
  yield take( actionTypes.GIF_MODAL_CANCEL_REQUEST_IMAGE );
  yield cancel( fetchImageTask );
}

export function* fetchImage( requestedImage ) {
  const loadedImage = yield call( fetchImageWrapper, requestedImage );
  yield put({
    type: actionTypes.GIF_MODAL_IMAGE_LOADED,
    payload: { fullImage: loadedImage }
  });
}

export function* listenForGifModalImageRequests() {
  yield* takeEvery( actionTypes.GIF_MODAL_REQUEST_IMAGE, requestImage );
}
