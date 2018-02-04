import { addRecentSearch, clearRecentSearches } from '../helpers/localStorage';
import { ADD_RECENT_SEARCH_LOCAL_STORAGE, CLEAR_RECENT_SEARCH_LOCAL_STORAGE } from '../constants/actionTypes';

export const recentSearches = (state = [], action = {}) => {
  switch(action.type) {

  case ADD_RECENT_SEARCH_LOCAL_STORAGE:
    return {
      ...state,
      recentSearches: addRecentSearch(action.value)
    };

  case CLEAR_RECENT_SEARCH_LOCAL_STORAGE:
    return {
      ...state,
      recentSearches: clearRecentSearches()
    };

  default:
    return state;

  }
};

export default recentSearches;
