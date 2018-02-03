import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getParameterByName from '../helpers/getParameterByName';
import { REQUEST_SEARCH_DATA, ADD_RECENT_SEARCH_LOCAL_STORAGE } from '../constants/actionTypes';
import { DEFAULT_SEARCH_TERM } from '../constants/';
import * as styles from './SearchInput.css';

class SearchInput extends Component {

  constructor(props) {
    super();
    const { dispatch } = props;

    window.onpopstate = () => {
      dispatch({
        type: REQUEST_SEARCH_DATA,
        payload: {
          searchOffset: 0,
          searchTerm: getParameterByName('s') || DEFAULT_SEARCH_TERM
        }
      });
    };
  }

  addItemHandler( e ) {
    e.preventDefault();
    const { dispatch } = this.props;
    if(this.refs.searchGiphyInput.value !== ''){
      window.history.pushState({}, 'Search', `?s=${this.refs.searchGiphyInput.value}`);

      dispatch({
        type: REQUEST_SEARCH_DATA,
        payload: {
          searchOffset: 0,
          searchTerm: this.refs.searchGiphyInput.value
        }
      });

      dispatch({
        type: ADD_RECENT_SEARCH_LOCAL_STORAGE,
        value: this.refs.searchGiphyInput.value
      });

      this.refs.searchGiphyInput.value = ''; // clear input field once redux store has been updated
    }
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <form onSubmit={(event) => this.addItemHandler( event )} className={`sg-row ${styles.form}`}>
          <input
            className={styles.input}
            type="text"
            ref="searchGiphyInput"
            placeholder="Enter search term..."
            autoFocus
          />
          <button className={isLoading ? styles.buttonDisabled : styles.button} title={'Search Giphy'} type={'submit'} label={'Search'}>
            {isLoading ? 'Loading' : 'Search Giphy'}
          </button>
        </form>
      </div>
    );
  }
}

SearchInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default connect((state) => {
  return {
    dispatch: state.dispatch,
    isLoading: state.imageSearch.isLoading
  };
})(SearchInput);
