import React, { Component, PropTypes } from 'react';
import { PreloadFadeInImage } from './PreloadFadeInImage';
import styles from './Image.css';

export class Image extends Component {

  constructor(){
    super();
    this.setSelection = this.setSelection.bind(this);
  }

  setSelection (e) {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  render() {
    const { image } = this.props;
    return (
      <div>
        <a href={image.url} className={styles.image}>
          <PreloadFadeInImage
            className={styles.img}
            imgSauce={image.images.fixed_width.url}
          />
        </a>

        <label className={styles.githubEmbedLabel}>Github embed code
          <input
            onFocus={this.setSelection}
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
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    images: PropTypes.shape({
      fixed_width: PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    })
  })
};
