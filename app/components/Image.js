import React, { Component, PropTypes } from 'react';
import PreloadFadeInImage from './PreloadFadeInImage';
import { GIF_MODAL_REQUEST_IMAGE } from '../constants/actionTypes';
import styles from './Image.css';

export default class Image extends Component {

  constructor (){
    super();
    this.setSelection = this.setSelection.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  /**
  Select all the text on focus for easy copy/pasting */
  setSelection (e) {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  selectImage (e) {
    const { dispatch, image } = this.props;
    e.preventDefault();

    /**
    Open modal with thumb inage at full image's dimensions
    Then request full image via a preloader which jams it's url into redux as `modal.fullImage` when loaded */
    dispatch({
      type: GIF_MODAL_REQUEST_IMAGE,
      payload: {
        requestedImage: image.images.original.url,
        thumbImage: {
          url: image.images.fixed_width.url,
          width: `${image.images.original.width}px`,
          height: `${image.images.original.height}px`
        },
        giphyURL: image.url
      }
    });
  }

  render() {
    const { image } = this.props;
    return (
      <div>
        <a onClick={this.selectImage} className={styles.image}>
          <PreloadFadeInImage
            className={styles.img}
            imgSauce={image.images.fixed_width.url}
          />
        </a>
        <label className={styles.githubEmbedLabel}>
          <input
            onFocus={this.setSelection}
            onClick={this.setSelection}
            className={styles.githubEmbedInput}
            type="text"
            defaultValue={`<img src="${image.images.original.url}" width="100%" />`}
          />
        </label>
      </div>
    );
  }
}

Image.propTypes = {
  dispatch: PropTypes.func,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    images: PropTypes.shape({
      fixed_width: PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    })
  })
};
