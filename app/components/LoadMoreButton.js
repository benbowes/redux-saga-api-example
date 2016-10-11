import React, {PropTypes} from 'react';
import { REQUEST_SHOW_MORE } from '../constants/actionTypes';
import * as styles from './LoadMoreButton.css';

const LoadMoreButton = ({ dispatch, searchTerm, searchOffset, isLoading }) => {

  return (
    <div className={styles.buttonContainer}>
      <button
        className={isLoading ? styles.buttonDisabled : styles.button}
        onClick={() => dispatch({
          type: REQUEST_SHOW_MORE,
          payload: { searchOffset, searchTerm }
        })}
        disabled={isLoading}
      >
        {!isLoading
          ? <span>More results for &lsquo;{searchTerm}&rsquo;</span>
          : <span>Requesting GIFs...</span>
        }
      </button>
    </div>
  );
};

LoadMoreButton.propTypes = {
  searchTerm: PropTypes.string,
  dispatch: PropTypes.func,
  searchOffset: PropTypes.number.isRequired,
  isLoading: PropTypes.bool
};

export default LoadMoreButton;
