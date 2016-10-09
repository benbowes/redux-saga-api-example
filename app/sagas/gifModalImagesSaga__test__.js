import 'babel-polyfill'; // required by redux-saga for generator func's
import expect from 'expect';
import { createMockTask } from 'redux-saga/utils';
import { put, call, take, fork, cancel } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchImage, requestImage, listenForGifModalImageRequests } from './gifModalImagesSaga';
import { fetchImageWrapper } from './helpers/fetchImageWrapper';

describe(`Saga "gifModalImagesSaga"`, () => {

  it(`It'll cycle through listenForDataRequests() forever`, () => {

    const generator = listenForGifModalImageRequests();

    let result = generator.next();
    expect( result.value ).toEqual( take( actionTypes.GIF_MODAL_REQUEST_IMAGE ) );

    result = generator.next();
    expect( result.value.FORK.fn ).toEqual( requestImage );

    // Cycles back to first step in saga
    result = generator.next();
    expect( result.value ).toEqual( take( actionTypes.GIF_MODAL_REQUEST_IMAGE ) );

    // And is still active
    expect( result.done ).toEqual( false );

  });

  it(`GIF_MODAL_REQUEST_IMAGE will fork fetchImage()`, () => {

    const action = {
      type: actionTypes.GIF_MODAL_REQUEST_IMAGE,
      payload: { requestedImage: 'http://some.url' }
    };

    const generator = requestImage( action );

    let result = generator.next();
    expect( result.value ).toEqual( fork(fetchImage, 'http://some.url') );

    const mockedTask = createMockTask();
    result = generator.next( mockedTask );
    expect( result.value ).toEqual(
      take( actionTypes.GIF_MODAL_CANCEL_REQUEST_IMAGE )
    );

    result = generator.next( mockedTask );
    expect(result.value).toEqual( cancel( mockedTask ) );

    result = generator.next();
    expect( result.done ).toEqual( true );

  });

  it(`fetchImage() will fire expected action`, () => {
    const fullResImageUrl = 'http://giphy.url';
    const generator = fetchImage( fullResImageUrl );

    let result = generator.next();
    expect( result.value ).toEqual( call(fetchImageWrapper, fullResImageUrl) );

    result = generator.next( fullResImageUrl );
    expect( result.value ).toEqual( put({
      type: actionTypes.GIF_MODAL_IMAGE_LOADED,
      payload: { fullImage: fullResImageUrl }
    }));

    result = generator.next();
    expect( result.done ).toEqual( true );

  });

});
