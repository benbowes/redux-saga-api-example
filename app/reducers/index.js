import { combineReducers } from 'redux';

import imageSearch from './imageSearch';
import modal from './modal';
import recentSearches from './recentSearches';

const rootReducer = combineReducers({
  imageSearch,
  modal,
  recentSearches
});

export default rootReducer;
