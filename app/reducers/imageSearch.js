import {
  REQUEST_SEARCH_DATA,
  RECEIVE_SEARCH_DATA,
  RECEIVE_SEARCH_DATA_FAILED,
  REQUEST_SHOW_MORE
} from '../constants/actionTypes';

export const initialState = {
  images: [],
  loading: false,
  showMorePossible: true,
  messages: undefined,
  searchTerm: undefined,
  searchOffset: 0,
  totalResultsCount: undefined
};

export const getSearchOffset = (searchOffset, data) => {
  return ((searchOffset + 25) < data.pagination.total_count)
    ? searchOffset + 25
    : data.pagination.total_count;
};

export const getShowMorePossible = (searchOffset, data) => {
  return ((searchOffset + 25) < data.pagination.total_count)
    ? true
    : false;
};

export const imageSearch = ( state = initialState, action = {} ) => {

  switch(action.type) {

  case REQUEST_SEARCH_DATA:
    return {
      ...initialState,
      loading: true
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
      showMorePossible: getShowMorePossible( state.searchOffset, action.payload.receivedData ),
      searchTerm: action.payload.searchTerm,
      images: [...state.images, ...action.payload.receivedData.data],
      searchOffset: getSearchOffset( state.searchOffset, action.payload.receivedData ),
      totalResultsCount: action.payload.receivedData.pagination.total_count
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
