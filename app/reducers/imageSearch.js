import {
  REQUEST_SEARCH_DATA,
  RECEIVE_SEARCH_DATA,
  RECEIVE_SEARCH_DATA_FAILED,
  REQUEST_SHOW_MORE
} from 'constants/actionTypes';

export const imageSearch = ( state = { searchOffset: 0 }, action = {} ) => {

  switch(action.type) {

  case REQUEST_SEARCH_DATA:
    return {
      ...state,
      loading: true,
      messages: undefined,
      searchTerm: undefined,
      searchOffset: state.searchOffset,
      images: []
    };

  case REQUEST_SHOW_MORE:
    return {
      ...state,
      loading: true
    };

  case RECEIVE_SEARCH_DATA:
    return {
      ...state,
      loading: false,
      messages: undefined,
      searchTerm: action.payload.searchTerm,
      images: [...state.images, ...action.payload.receivedData.data],
      searchOffset: state.searchOffset + 25
    };

  case RECEIVE_SEARCH_DATA_FAILED:
    return {
      ...state,
      loading: false,
      messages: 'Oh dear, all the things just died :(',
      searchTerm: action.payload.searchTerm
    };

  default:
    return state;

  }
};

export default imageSearch;
