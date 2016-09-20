import 'ignore-styles';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { Image } from './Image';

const image = {
  url: 'http://some-giphy-permalink.url',
  images: {
    fixed_width: {
      url: 'http://some-image.url'
    }
  }
};

describe('<Image />', () => {
  it('Should render as expected', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render( <Image image={image} /> );
    const ReactComponent = renderer.getRenderOutput();

    expect( ReactComponent.type ).toEqual('a');
    expect( ReactComponent.props.href ).toEqual('http://some-giphy-permalink.url');
    expect(ReactComponent.props.children.type).toEqual('img');
    expect(ReactComponent.props.children.props.src).toEqual('http://some-image.url');
  });
});
