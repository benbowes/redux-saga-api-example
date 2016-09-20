import React, {PropTypes} from 'react';
import { REQUEST_SHOW_MORE } from 'constants/actionTypes';
import * as styles from './LoadMoreButton.css';

export const LoadMoreButton = (props) => {
  const { dispatch, searchTerm, searchOffset } = props;
  const searchTermQuery = searchTerm && searchTerm.replace(/ /g,'+');
  return (
    <button className={styles.button} onClick={() => {
      dispatch({
        type: REQUEST_SHOW_MORE,
        payload: {
          url: `http://api.giphy.com/v1/gifs/search?q=${searchTermQuery}&api_key=dc6zaTOxFJmzC&offset=${searchOffset}`,
          searchTerm: searchTerm
        }
      });
    }}>
      More results for &lsquo;{searchTerm}&rsquo;
    </button>
  );
};

LoadMoreButton.propTypes = {
  searchTerm: PropTypes.string,
  dispatch: PropTypes.func,
  searchOffset: PropTypes.number.isRequired,
  loading: PropTypes.bool
};
