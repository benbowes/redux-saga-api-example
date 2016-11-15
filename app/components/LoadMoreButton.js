import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { REQUEST_SHOW_MORE } from '../constants/actionTypes';
import * as styles from './LoadMoreButton.css';

class LoadMoreButton extends Component {

  constructor() {
    super();
    this.isInView = this.isInView.bind(this);
    this.DOM = undefined;
  }

  // Infinite scroll
  isInView() {
    const { isLoading } = this.props;
    const buttonIsCurrentlyRendered = this.DOM.getBoundingClientRect().top > 0;
    const buttonIsInView = this.DOM.getBoundingClientRect().top < 500;

    if (buttonIsCurrentlyRendered && buttonIsInView && !isLoading) {
      this.buttonRef.click();
    }
  }

  componentDidMount() {
    this.DOM = ReactDOM.findDOMNode(this);
    window.addEventListener('scroll', this.isInView, false);
  }

  render() {
    const { dispatch, searchTerm, searchOffset, isLoading } = this.props;

    return (
      <div className={styles.buttonContainer}>
        <button
          className={isLoading ? styles.buttonDisabled : styles.button}
          ref={(button) => this.buttonRef = button}
          onClick={() => dispatch({
            type: REQUEST_SHOW_MORE,
            payload: { searchOffset, searchTerm }
          })}
          disabled={isLoading}
        >
          {!isLoading
            ? <span>More results for &lsquo;{searchTerm}&rsquo;</span>
            : <span>Requesting GIFs...</span>
          }
        </button>
      </div>
    );

  }
}

LoadMoreButton.propTypes = {
  searchTerm: PropTypes.string,
  dispatch: PropTypes.func,
  searchOffset: PropTypes.number.isRequired,
  isLoading: PropTypes.bool
};

export default LoadMoreButton;
