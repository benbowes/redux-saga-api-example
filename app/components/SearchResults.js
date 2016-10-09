import React, { PropTypes } from 'react';
import Image from './Image';
import getCycledColor from '../helpers/getCycledColor';
import * as styles from './SearchResults.css';

const SearchResults = ({ imageSearchResults, dispatch }) => {
  return (
    <ol className={styles.imageListingItems}>
      {imageSearchResults.map((imageData, index) =>
        <li key={`${imageData.id}-${index}`}
          style={{backgroundColor: getCycledColor(index)}}
          className={styles.imageListingItem}
        >
          <Image image={imageData} dispatch={dispatch} />
        </li>
      )}
    </ol>
  );
};

SearchResults.propTypes = {
  imageSearchResults: PropTypes.array,
  dispatch: PropTypes.func
};

export default SearchResults;
