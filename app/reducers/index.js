import { combineReducers } from 'redux';

import imageSearch from './imageSearch';
import modal from './modal';

const rootReducer = combineReducers({
  imageSearch,
  modal
});

export default rootReducer;
