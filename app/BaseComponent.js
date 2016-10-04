import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { REQUEST_SEARCH_DATA } from 'constants/actionTypes';
import { Image } from 'components/Image';
import { LoadMoreButton } from 'components/LoadMoreButton';
import SearchInput from 'components/SearchInput';
import getSearchTermQuery from 'helpers/getSearchTermQuery';
import getCycledColor from 'helpers/getCycledColor';
import * as styles from './BaseComponent.css';

export class BaseComponent extends Component {

  constructor(){
    super();
    this.initialSearchTerm = 'funny dog';
  }

  componentDidMount() {
    const { dispatch, searchOffset } = this.props;
    dispatch({
      type: REQUEST_SEARCH_DATA,
      payload: {
        url: `//api.giphy.com/v1/gifs/search?q=${getSearchTermQuery(this.initialSearchTerm)}&api_key=dc6zaTOxFJmzC&offset=${searchOffset}`,
        searchTerm: this.initialSearchTerm
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
      <h1 className={styles.h1}>
        <span className={styles.heading}>You searched </span>
        {searchTerm &&
          <span>
            <span className={styles.heading}>for</span>
            <span className={styles.headingAlt}> {searchTerm}</span>
          </span>
        }
      </h1>

      <SearchInput dispatch={dispatch} />

      {imageSearchResults && imageSearchResults.length > 0 &&
        <ol className={styles.imageListingItems}>
          {imageSearchResults.map((imageData, index) =>
            <li key={`${imageData.id}-${index}`} style={{backgroundColor: getCycledColor(index)}} className={styles.imageListingItem}>
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