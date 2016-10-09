import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { GIF_MODAL_CANCEL_REQUEST_IMAGE } from '../constants/actionTypes';
import styles from './GifModal.css';

export default class GifModal extends Component {

  constructor() {
    super();
    this.gifModalDOM = undefined;
  }

  /**
  Focus when props.fullImage is full or props.modalIsLoading is true */

  componentDidUpdate() {
    const { fullImage, modalIsLoading } = this.props;
    if (fullImage !== '' || modalIsLoading) this.gifModalDOM.focus();
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
    const { fullImage, modalIsLoading, thumbImage } = this.props;

    return (
      <div className={styles.modal} tabIndex="-1" ref="gifModal">
        {modalIsLoading

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
      </div>
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
  modalIsLoading: PropTypes.bool.isRequired
};
