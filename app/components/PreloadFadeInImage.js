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
    }, 100);
  }

  componentWillUnmount() {
    // cleanup before removing from the DOM
    this.preloadImg.onload = undefined;
    this.preloadImg = undefined;
    clearTimeout(this.timeout);
  }

  render() {
    const { imgSauce } = this.props;
    const isLoadingStyle = {transition: 'opacity 0.3s ease-out', opacity: '0'};
    const isLoadedStyle = {transition: 'opacity 0.3s ease-out'};
    return (
      <img src={imgSauce}
        style={this.state.isLoading ? isLoadingStyle: isLoadedStyle}
      />
    );

  }
}

PreloadFadeInImage.propTypes = {
  imgSauce: PropTypes.string.isRequired
};
