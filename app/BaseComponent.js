import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { REQUEST_SEARCH_DATA, REQUEST_SHOW_MORE } from 'constants/actionTypes';
import { Image } from 'components/Image';
import SearchInput from 'components/SearchInput';
import * as styles from './BaseComponent.scss';

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
      <div className={styles['image-listing']}>
      <h1>Results {searchTerm && <span>for &quot;{searchTerm}&quot;</span>}</h1>

      <SearchInput dispatch={dispatch} />

      {imageSearchResults && imageSearchResults.length > 0 &&
        <ol>
          {imageSearchResults.map((imageData, index) =>
            <li key={`${imageData.id}-${index}`} className={styles['image-listing__item']}>
              <Image image={imageData} />
            </li>
          )
          }
        </ol>
      }

      {!loading &&
        <button style={{width:'200px', alignSelf: 'center', padding: '8px'}} onClick={() => {
          dispatch({
            type: REQUEST_SHOW_MORE,
            payload: {
              url: `http://api.giphy.com/v1/gifs/search?q=funny+dog&api_key=dc6zaTOxFJmzC&offset=${searchOffset}`,
              searchTerm: 'funny dog'
            }
          });
        }}>
          SHOW MORE
        </button>
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
