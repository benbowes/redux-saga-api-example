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

  componentDidMount() {
    const { dispatch, searchOffset, searchTerm } = this.props;
    dispatch({
      type: REQUEST_SEARCH_DATA,
      payload: {
        url: `//api.giphy.com/v1/gifs/search?q=${getSearchTermQuery(searchTerm)}&api_key=dc6zaTOxFJmzC&offset=${searchOffset}`,
        searchTerm: searchTerm
      }
    });
  }

  render() {
    const {
      dispatch,
      imageSearchResults,
      isLoading,
      searchTerm,
      showMorePossible,
      searchOffset,
      totalResultsCount
    } = this.props;

    return (
      <div className={styles.imageListing}>
      <h1 className={styles.h1}>
        <span className={styles.heading}> </span>
        {searchTerm
          ? <span>
              <span className={styles.heading}>You searched for</span>
              <span className={styles.headingAlt}> {searchTerm}</span>
            </span>
          : <span className={styles.headingAlt}>Just a sec...</span>
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

      {totalResultsCount < 1 &&
        <p className={styles.emptyMessage}>No GIFs here :(</p>
      }

      {showMorePossible && totalResultsCount > 0 &&
        <LoadMoreButton
          dispatch={dispatch}
          searchOffset={searchOffset}
          searchTerm={searchTerm}
          isLoading={isLoading}
        />
      }
      </div>
    );
  }
}

BaseComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imageSearchResults: PropTypes.array,
  isLoading: PropTypes.bool,
  showMorePossible: PropTypes.bool,
  searchOffset: PropTypes.number,
  searchTerm: PropTypes.string,
  totalResultsCount: PropTypes.number
};

export default connect((state) => {
  return {
    imageSearchResults: state.imageSearch.images,
    dispatch: state.dispatch,
    isLoading: state.imageSearch.isLoading,
    showMorePossible: state.imageSearch.showMorePossible,
    searchOffset: state.imageSearch.searchOffset,
    searchTerm: state.imageSearch.searchTerm,
    totalResultsCount: state.imageSearch.totalResultsCount
  };
})(BaseComponent);
