import expect from 'expect';
import * as actionTypes from '../constants/actionTypes';
import { initialState, modal } from './modal';

describe(`Reducers "modal"`, () => {

  it(`It should return default state`, () => {
    const result = modal(undefined, {});
    expect(result).toEqual(initialState);
  });

  it(`It should reset state to initial state when REQUEST_SEARCH_DATA or REQUEST_SHOW_MORE`, () => {
    const state = {
      fullImage: '',
      isLoading: true,
      requestedImage: 'http://some.url',
      thumbImage: {
        url: 'http://someThumb.url',
        width: '300px',
        height: '100px'
      },
      giphyURL: 'http://some.giphy.url'
    };
    let result = modal(state, {type: actionTypes.REQUEST_SEARCH_DATA});
    expect(result).toEqual(initialState);

    result = modal(state, {type: actionTypes.REQUEST_SHOW_MORE});
    expect(result).toEqual(initialState);

    // Did not mutate state
    expect(state).toNotEqual(initialState);
  });

  it(`It should set isLoading:true and expected state when GIF_MODAL_REQUEST_IMAGE`, () => {
    const result = modal(undefined, {
      type: actionTypes.GIF_MODAL_REQUEST_IMAGE,
      payload: {
        requestedImage: 'http://some.url',
        thumbImage: {
          url: 'http://someThumb.url',
          width: '300px',
          height: '100px'
        },
        giphyURL: 'http://some.giphy.url'
      }
    });
    expect(result).toEqual({
      ...initialState,
      fullImage: '',
      isLoading: true,
      requestedImage: 'http://some.url',
      thumbImage: {
        url: 'http://someThumb.url',
        width: '300px',
        height: '100px'
      },
      giphyURL: 'http://some.giphy.url'
    });
  });

  it(`It should set isLoading:false when GIF_MODAL_IMAGE_LOADED`, () => {
    const result = modal(initialState, {
      type: actionTypes.GIF_MODAL_IMAGE_LOADED,
      payload: {
        fullImage: 'http://some.url'
      }
    });
    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      fullImage: 'http://some.url'
    });
  });

});
