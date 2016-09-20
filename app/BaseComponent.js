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
        url: `http://api.giphy.com/v1/gifs/search?q=funny+dog&api_key=dc6zaTOxFJmzC&offset=${searchOffset}`,
        searchTerm: 'funny dog'
      }
    });
  }

  render() {
    const {
      imageSearchResults,
      searchTerm,
      dispatch,
      searchOffset,
      loading
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

      {!loading &&
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
  imageSearchResults: PropTypes.array,
  searchTerm: PropTypes.string,
  dispatch: PropTypes.func,
  searchOffset: PropTypes.number.isRequired,
  loading: PropTypes.bool
};

export default connect((state) => {
  return {
    imageSearchResults: state.imageSearch.images,
    searchTerm: state.imageSearch.searchTerm,
    dispatch: state.dispatch,
    searchOffset: state.imageSearch.searchOffset,
    loading: state.imageSearch.loading
  };
})(BaseComponent);
