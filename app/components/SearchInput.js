import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getSearchTermQuery from '../helpers/getSearchTermQuery';
import * as styles from './SearchInput.css';

class SearchInput extends Component {
  addItemHandler( event ) {
    const { dispatch } = this.props;
    event.preventDefault();

    if(this.refs.searchGiphyInput.value !== ''){
      dispatch({
        type: 'REQUEST_SEARCH_DATA',
        payload: {
          url: `//api.giphy.com/v1/gifs/search?q=${getSearchTermQuery(this.refs.searchGiphyInput.value)}&api_key=dc6zaTOxFJmzC`,
          searchTerm: this.refs.searchGiphyInput.value
        }
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

          <button className={styles.button} title={'Search Giphy'} type={'submit'} label={'Search'}>
            {isLoading ? 'loading...' : 'Search Giphy'}
          </button>

        </form>

      </div>
    );
  }
}

SearchInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect((state) => {
  return {
    dispatch: state.dispatch,
    isLoading: state.imageSearch.loading
  };
})(SearchInput);
