import getParameterByName from '../helpers/getParameterByName';
import { getRecentSearches } from '../helpers/localStorage';
import { DEFAULT_SEARCH_TERM } from '../constants/';

/*
* @description initial state that we inject into our redux store at bootup.
*/

export const initialState = {
  imageSearch: {
    searchTerm: getParameterByName('s') || DEFAULT_SEARCH_TERM,
    searchOffset: 0
  },
  recentSearches: {
    recentSearches: getRecentSearches()
  }
};
