import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as styles from './SearchInput.scss';

/**
* @description Class component. Styles prefixed with `sg-` are coming in from a global stylesheet
* @returns {JSX} */

class SearchInput extends Component {

  /**
  * @param event {SyntheticEvent} React event that mimics a form submit event */

  addItemHandler( event ) {
    const { dispatch } = this.props;
    event.preventDefault();

    if(this.refs.searchGiphyInput.value !== ''){
      dispatch({
        type: 'REQUEST_SEARCH_DATA',
        payload: {
          url: `http://api.giphy.com/v1/gifs/search?q=${this.refs.searchGiphyInput.value.replace(/ /g, '+')}&api_key=dc6zaTOxFJmzC`,
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
        <form onSubmit={(event) => this.addItemHandler( event )} className="sg-row">

          <input
            className={styles.input}
            type="text"
            ref="searchGiphyInput"
            placeholder="Search Giphy..."
          />

          <button className={styles.button} title={'Search Giphy'} type={'submit'} label={'Search'}>
            {isLoading ? 'loading...' : 'Search Giphy'}
          </button>

        </form>
        <p>&nbsp;</p>
      </div>
    );
  }
}

SearchInput.propTypes = {
  dispatch: PropTypes.func,
  isLoading: PropTypes.bool
};

export default connect((state) => {
  return {
    isLoading: state.imageSearch.loading,
    dispatch: state.dispatch
  };
})(SearchInput);
