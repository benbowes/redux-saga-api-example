import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { REQUEST_SEARCH_DATA } from 'constants/actionTypes';
import { Image } from 'components/Image';
import { LoadMoreButton } from 'components/LoadMoreButton';
import SearchInput from 'components/SearchInput';
import * as styles from './BaseComponent.css';

/**
* @description ES6 class component. The root component...
* @returns {JSX} */

export class BaseComponent extends Component {

  componentDidMount() {
    const { dispatch, searchOffset } = this.props;
    dispatch({
      type: REQUEST_SEARCH_DATA,
      payload: {
        url: `//api.giphy.com/v1/gifs/search?q=funny+dog&api_key=dc6zaTOxFJmzC&offset=${searchOffset}`,
        searchTerm: 'funny dog'
      }
    });
  }

  render() {
    const {
      dispatch,
      imageSearchResults,
      loading,
      searchTerm,
      showMorePossible,
      searchOffset
    } = this.props;

    return (
      <div className={styles.imageListing}>
      <h1 className={styles.heading}>You searched {searchTerm && <span>for &lsquo;{searchTerm}&rsquo;</span>}</h1>

      <SearchInput dispatch={dispatch} />

      {imageSearchResults && imageSearchResults.length > 0 &&
        <ol className={styles.imageListingItems}>
          {imageSearchResults.map((imageData, index) =>
            <li key={`${imageData.id}-${index}`} className={styles.imageListingItem}>
              <Image image={imageData} />
            </li>
          )
          }
        </ol>
      }

      {showMorePossible &&
        <LoadMoreButton
          dispatch={dispatch}
          searchOffset={searchOffset}
          searchTerm={searchTerm}
          loading={loading}
        />
      }
      </div>
    );
  }
}

BaseComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imageSearchResults: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  showMorePossible: PropTypes.bool.isRequired,
  searchOffset: PropTypes.number.isRequired,
  searchTerm: PropTypes.string
};

export default connect((state) => {
  return {
    imageSearchResults: state.imageSearch.images,
    dispatch: state.dispatch,
    loading: state.imageSearch.loading,
    showMorePossible: state.imageSearch.showMorePossible,
    searchOffset: state.imageSearch.searchOffset,
    searchTerm: state.imageSearch.searchTerm
  };
})(BaseComponent);
