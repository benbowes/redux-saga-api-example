import React, { Component, PropTypes } from 'react';

export class PreloadFadeInImage extends Component {

  constructor() {
    super();
    this.state = { isLoading: true };
    this.timeout;
    this.preloadImg;
  }

  componentDidMount() {
    const { imgSauce } = this.props;
    this.timeout = setTimeout(() => {
      this.preloadImg = new Image();
      this.preloadImg.onload = () => this.setState({
        isLoading: false
      });
      this.preloadImg.src = imgSauce;
    }, 10);
  }

  componentWillUnmount() {
    // cleanup before removing from the DOM
    this.preloadImg.onload = undefined;
    this.preloadImg = undefined;
    clearTimeout(this.timeout);
  }

  render() {
    const { imgSauce, className } = this.props;
    const isLoadingStyle = {transition: 'opacity 0.3s ease-out', opacity: '0'};
    const isLoadedStyle = {transition: 'opacity 0.3s ease-out'};
    return (
      <img src={imgSauce}
        className={className || ''}
        style={this.state.isLoading ? isLoadingStyle: isLoadedStyle}
      />
    );

  }
}

PreloadFadeInImage.propTypes = {
  className: PropTypes.string,
  imgSauce: PropTypes.string.isRequired
};
