import React, { PropTypes } from 'react';
import { PreloadFadeInImage } from './PreloadFadeInImage';
import styles from './Image.css';

/**
* @description Stateless function component.
* @returns {JSX} */

export const Image = ( props ) => {
  return (
    <a href={props.image.url} className={styles.image}>
      <PreloadFadeInImage
        className={styles.img}
        imgSauce={props.image.images.fixed_width.url}
      />
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
