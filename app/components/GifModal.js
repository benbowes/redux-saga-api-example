import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { GIF_MODAL_CANCEL_REQUEST_IMAGE } from '../constants/actionTypes';
import styles from './GifModal.css';

export default class GifModal extends Component {

  componentDidUpdate() {
    const { fullImage, modalIsLoading } = this.props;
    const gifModalDOM = ReactDOM.findDOMNode(this.refs.gifModal);
    if (fullImage !== '' || modalIsLoading) {
      gifModalDOM.focus();
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const gifModalDOM = ReactDOM.findDOMNode(this.refs.gifModal);

    gifModalDOM.addEventListener('keydown', (e) => {
      e = e || window.event;
      if (e.keyCode == 27) {
        gifModalDOM.blur();
        dispatch({ type: GIF_MODAL_CANCEL_REQUEST_IMAGE });
      }
    });

    gifModalDOM.addEventListener('blur', () => {
      dispatch({ type: GIF_MODAL_CANCEL_REQUEST_IMAGE });
    });
  }

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
                style={{
                  width: thumbImage.width,
                  height: thumbImage.height
                }}
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
