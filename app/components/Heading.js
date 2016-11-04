import React, { PropTypes } from 'react';
import * as styles from './Heading.css';

const Heading = ({ searchTerm, isLoading }) => (
  <h1 className={styles.h1}>
    {!isLoading
      ? <span>
          <span className={styles.heading}>You searched for</span>
          <span className={styles.headingAlt}> `{searchTerm}`</span>
        </span>
      : <span>
          <span className={styles.heading}>Looking for</span>
          <span className={styles.headingAlt}> `{searchTerm}`...</span>
        </span>
    }
  </h1>
);

Heading.propTypes = {
  searchTerm: PropTypes.string,
  isLoading: PropTypes.bool
};

export default Heading;
