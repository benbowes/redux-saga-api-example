import {
  REQUEST_SEARCH_DATA,
  RECEIVE_SEARCH_DATA,
  RECEIVE_SEARCH_DATA_FAILED,
  REQUEST_SHOW_MORE
} from 'constants/actionTypes';

const initialState = {
  images: [],
  loading: false,
  messages: undefined,
  searchTerm: undefined,
  searchOffset: 1
};

const getSearchOffset = (searchOffset, data) => {
  if( !data.pagination ) return searchOffset + 25;

  return ((searchOffset + 25) < data.pagination.total_count)
    ? searchOffset + 25
    : data.pagination.total_count;
};

export const imageSearch = ( state = initialState, action = {} ) => {

  switch(action.type) {

  case REQUEST_SEARCH_DATA:
    return {
      ...state,
      loading: true,
      messages: undefined,
      searchTerm: undefined,
      searchOffset: 1,
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
      searchOffset: getSearchOffset( state.searchOffset, action.payload.receivedData )
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
