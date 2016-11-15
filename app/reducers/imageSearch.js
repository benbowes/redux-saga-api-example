import {
  REQUEST_SEARCH_DATA,
  RECEIVE_SEARCH_DATA,
  RECEIVE_SEARCH_DATA_FAILED,
  REQUEST_SHOW_MORE
} from '../constants/actionTypes';

export const initialState = {
  images: [],
  isLoading: false,
  showMorePossible: true,
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
      isLoading: true,
      searchOffset: action.payload.searchOffset,
      searchTerm: action.payload.searchTerm
    };

  case REQUEST_SHOW_MORE:
    return {
      ...state,
      isLoading: true,
      searchOffset: action.payload.searchOffset,
      searchTerm: action.payload.searchTerm
    };

  case RECEIVE_SEARCH_DATA:
    return {
      ...state,
      isLoading: false,
      showMorePossible: getShowMorePossible( state.searchOffset, action.payload.receivedData ),
      images: [...state.images, ...action.payload.receivedData.data],
      searchOffset: getSearchOffset( state.searchOffset, action.payload.receivedData ),
      totalResultsCount: action.payload.receivedData.pagination.total_count
    };

  case RECEIVE_SEARCH_DATA_FAILED:

    console.warn(
      'Oh dear, all the things just died :(',
      'ERROR =>', action.payload.error,
      'FAILED ACTION =>', action.payload.failedAction
    );

    return {
      ...state,
      isLoading: false
    };

  default:
    return state;

  }
};

export default imageSearch;
