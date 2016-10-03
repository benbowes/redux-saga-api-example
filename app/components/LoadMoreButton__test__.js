import 'ignore-styles';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { LoadMoreButton, getSearchTermQuery } from './LoadMoreButton';

describe('<LoadMoreButton />', () => {

  it('getSearchTermQuery replace spaces with plus signs', () => {
    expect( getSearchTermQuery('1 2 3 4 5') ).toEqual('1+2+3+4+5');
  });

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
    expect( ReactComponent.props.children.props.children ).toEqual('Bringing the GIFs...');
  });

});
