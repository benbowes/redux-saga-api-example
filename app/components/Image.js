import React, { PropTypes } from 'react';
import styles from './Image.scss';

/**
* @description Stateless function component.
* @returns {JSX} */

export const Image = ( props ) => {
  return (
    <a href={props.image.url} className={styles['image']}>
      <img src={props.image.images.fixed_width.url} />
    </a>
  );
};

Image.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    images: PropTypes.shape({
      fixed_width: PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    })
  })
};
