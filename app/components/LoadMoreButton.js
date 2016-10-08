import React, {PropTypes} from 'react';
import { REQUEST_SHOW_MORE } from '../constants/actionTypes';
import getSearchTermQuery from '../helpers/getSearchTermQuery';
import * as styles from './LoadMoreButton.css';

export const LoadMoreButton = ({ dispatch, searchTerm, searchOffset, isLoading }) => {
  const searchTermQuery = getSearchTermQuery(searchTerm);
  return (
    <button className={isLoading ? styles.buttonDisabled : styles.button} onClick={() => {
      dispatch({
        type: REQUEST_SHOW_MORE,
        payload: {
          url: `//api.giphy.com/v1/gifs/search?q=${searchTermQuery}&api_key=dc6zaTOxFJmzC&offset=${searchOffset}`,
          searchTerm: searchTerm
        }
      });
    }} disabled={isLoading}>
      {!isLoading
        ? <span>More results for &lsquo;{searchTerm}&rsquo;</span>
        : <span>Requesting GIFs...</span>
      }
    </button>
  );
};

LoadMoreButton.propTypes = {
  searchTerm: PropTypes.string,
  dispatch: PropTypes.func,
  searchOffset: PropTypes.number.isRequired,
  isLoading: PropTypes.bool
};
