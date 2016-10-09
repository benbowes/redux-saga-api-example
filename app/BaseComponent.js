import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GifModal from './components/GifModal';
import LoadMoreButton from './components/LoadMoreButton';
import Heading from './components/Heading';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import * as styles from './BaseComponent.css';

export class BaseComponent extends Component {

  render() {
    const { dispatch, imageSearchResults, isLoading, modalIsLoading,thumbImage,
      fullImage, searchTerm, showMorePossible, searchOffset, totalResultsCount } = this.props;

    return (
      <div className={styles.imageListing}>

        <GifModal dispatch={dispatch} thumbImage={thumbImage} fullImage={fullImage} modalIsLoading={modalIsLoading} />
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

        <a className={styles.githubLink} href="https://github.com/benbowes/redux-saga-api-example/" target="_blank" title="View on Github">View on Github</a>

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
  })
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
    totalResultsCount: state.imageSearch.totalResultsCount
  };
})(BaseComponent);
