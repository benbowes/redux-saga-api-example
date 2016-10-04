import 'ignore-styles';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { LoadMoreButton } from './LoadMoreButton';

describe('<LoadMoreButton />', () => {

  it('LoadMoreButton should render as expected', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <LoadMoreButton
        searchTerm={'Some searchTerm'}
        searchOffset={12}
        loading={false}
      />
    );
    const ReactComponent = renderer.getRenderOutput();
    expect( ReactComponent.type ).toEqual('button');
    expect( ReactComponent.props.disabled ).toEqual(false);
    expect( ReactComponent.props.children.props.children ).toEqual([ 'More results for ‘', 'Some searchTerm', '’' ]);
  });

  it('LoadMoreButton should get disabled when loading', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(
      <LoadMoreButton
        searchTerm={'Some searchTerm'}
        searchOffset={12}
        loading
      />
    );
    const ReactComponent = renderer.getRenderOutput();
    expect( ReactComponent.props.disabled ).toEqual(true);
    expect( ReactComponent.props.children.props.children ).toEqual('Requesting GIFs...');
  });

});
