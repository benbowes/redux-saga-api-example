import { takeEvery } from 'redux-saga';
import { put, call, take, fork, cancel } from 'redux-saga/effects';
import { fetchImageWrapper } from './helpers/fetchImageWrapper';
import { GIF_MODAL_IMAGE_LOADED, GIF_MODAL_REQUEST_IMAGE, GIF_MODAL_CANCEL_REQUEST_IMAGE } from '../constants/actionTypes';

function* requestImage( action ) {
  const fetchImageTask = yield fork( fetchImage, action.payload.requestedImage );

  // Cancels the load task - if action type GIF_MODAL_CANCEL_REQUEST_IMAGE is dispatched
  yield take( GIF_MODAL_CANCEL_REQUEST_IMAGE );
  yield cancel( fetchImageTask );
}

export function* fetchImage( requestedImage ) {
  const loadedImage = yield call( fetchImageWrapper, requestedImage );
  yield put({
    type: GIF_MODAL_IMAGE_LOADED,
    payload: { fullImage: loadedImage }
  });
}

export function* listenForGifModalImageRequests() {
  yield* takeEvery( GIF_MODAL_REQUEST_IMAGE, requestImage );
}
