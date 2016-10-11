import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { GIF_MODAL_CANCEL_REQUEST_IMAGE } from '../constants/actionTypes';
import styles from './GifModal.css';

export class GifModal extends Component {
  constructor() {
    super();
    this.gifModalDOM = undefined;
  }

  /**
  Visibility of GifModal is handled by the CSS :FOCUS pseudo selector.
  When the GifModal has focus it'll show.
  Focus in on GifModal when props.fullImage is full or props.modalIsLoading is true */
  componentDidUpdate() {
    const { fullImage, isLoading } = this.props;
    if (fullImage !== '' || isLoading) this.gifModalDOM.focus();
  }

  componentDidMount() {
    this.gifModalDOM = ReactDOM.findDOMNode(this.refs.gifModal);
    this.createModalOnBlurListeners();
  }

  /**
  Cacnel full image download when ESC key pressed or GifModal loses focus */
  createModalOnBlurListeners() {
    const { dispatch } = this.props;
    this.gifModalDOM.addEventListener('keydown', (e) => {
      e = e || window.event;
      if (e.keyCode == 27) {
        this.gifModalDOM.blur();
        dispatch({ type: GIF_MODAL_CANCEL_REQUEST_IMAGE });
      }
    });
    this.gifModalDOM.addEventListener('blur', () => {
      dispatch({ type: GIF_MODAL_CANCEL_REQUEST_IMAGE });
    });
  }

  /**
  When GifModal is loading, iniially show a preloader and the thumb image stretched
  out to full res image's dimensions.
  Then when loaded, update the GifModal with the full res image */
  render () {
    const { fullImage, isLoading, thumbImage, giphyURL } = this.props;

    return (
      <a href={giphyURL} target="_blank" title="View on Giphy" className={styles.modal} tabIndex="-1" ref="gifModal">
        {isLoading
          ? <div>
              <div className={styles.loadingSpinner}></div>
              <img
                alt="Full Image"
                className={styles.imgLoading}
                src={thumbImage.url}
                style={{ width: thumbImage.width, height: thumbImage.height }}
              />
            </div>
          : <img className={styles.img} src={fullImage} alt="Full Image" />
        }
      </a>
    );
  }
}

GifModal.propTypes = {
  dispatch: PropTypes.func,
  thumbImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  }).isRequired,
  fullImage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  giphyURL: PropTypes.string.isRequired
};

export default connect((state) => {
  return {
    dispatch: state.modal.dispatch,
    fullImage: state.modal.fullImage,
    giphyURL: state.modal.giphyURL,
    isLoading: state.modal.isLoading,
    thumbImage: state.modal.thumbImage
  };
})(GifModal);
