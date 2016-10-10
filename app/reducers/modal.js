import {
  GIF_MODAL_REQUEST_IMAGE,
  GIF_MODAL_IMAGE_LOADED,
  REQUEST_SHOW_MORE,
  REQUEST_SEARCH_DATA
 } from '../constants/actionTypes';

export const initialState = {
  fullImage: '',
  thumbImage: {
    url: '',
    width: '0px',
    height: '0px'
  },
  isLoading: false,
  requestedImage: '',
  giphyURL: ''
};

export const modal = ( state = initialState, action = {} ) => {

  switch(action.type) {

  case REQUEST_SEARCH_DATA:
  case REQUEST_SHOW_MORE:
    return {
      ...initialState
    };

  case GIF_MODAL_REQUEST_IMAGE:
    return {
      ...state,
      fullImage: '',
      isLoading: true,
      requestedImage: action.payload.requestedImage,
      thumbImage: {
        url: action.payload.thumbImage.url,
        width: action.payload.thumbImage.width,
        height: action.payload.thumbImage.height
      },
      giphyURL: action.payload.giphyURL
    };

  case GIF_MODAL_IMAGE_LOADED:
    return {
      ...state,
      isLoading: false,
      fullImage: action.payload.fullImage
    };

  default:
    return state;

  }
};

export default modal;
