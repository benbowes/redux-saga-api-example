import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GifModal from './components/GifModal';
import LoadMoreButton from './components/LoadMoreButton';
import Heading from './components/Heading';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import * as styles from './BaseComponent.css';

export class BaseComponent extends Component {

  state = {
    recentSearchesOpen: false
  }

  render() {
    const { recentSearchesOpen } = this.state;
    const { dispatch, imageSearchResults, isLoading, searchTerm, showMorePossible,
            searchOffset, totalResultsCount, recentSearches
          } = this.props;

    return (
      <div className={styles.imageListing}>
        <GifModal />
        <Heading isLoading={isLoading} searchTerm={searchTerm} />
        <SearchInput dispatch={dispatch} />
        <SearchResults dispatch={dispatch} imageSearchResults={imageSearchResults} />
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
        <div className={styles.recentSearches}>
          <a
            className={styles.recentSearchesButton}
            href="javascript:;"
            onClick={() => this.setState({ recentSearchesOpen: !recentSearchesOpen })}
          >Recent searches</a>

          <div className={styles.recentSearchesList} style={{display: recentSearchesOpen ? 'block' : 'none'}}>
            <div className={styles.recentSearchesTriangle} />
            {(recentSearches || []).map((searchTerm, index) => (
              <a className={styles.recentSearchesLink} key={`rs_${index}`} href={`?s=${searchTerm}`}>{searchTerm}</a>
            ))}
          </div>
        </div>
          <a className={styles.githubLink}
            href="https://github.com/benbowes/redux-saga-api-example/"
            target="_blank"
            title="View on Github">
              View on Github
          </a>
      </div>
    );
  }
}

BaseComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imageSearchResults: PropTypes.array,
  isLoading: PropTypes.bool,
  fullImage: PropTypes.string,
  showMorePossible: PropTypes.bool,
  searchOffset: PropTypes.number,
  searchTerm: PropTypes.string,
  totalResultsCount: PropTypes.number,
  modalIsLoading: PropTypes.bool,
  thumbImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  }),
  recentSearches: PropTypes.arrayOf(PropTypes.string)
};

export default connect((state) => {
  return {
    imageSearchResults: state.imageSearch.images,
    dispatch: state.dispatch,
    isLoading: state.imageSearch.isLoading,
    fullImage: state.modal.fullImage,
    thumbImage: state.modal.thumbImage,
    modalIsLoading: state.modal.isLoading,
    showMorePossible: state.imageSearch.showMorePossible,
    searchOffset: state.imageSearch.searchOffset,
    searchTerm: state.imageSearch.searchTerm,
    totalResultsCount: state.imageSearch.totalResultsCount,
    recentSearches: state.recentSearches.recentSearches
  };
})(BaseComponent);
