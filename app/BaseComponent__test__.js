import 'ignore-styles';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { BaseComponent } from './BaseComponent';
import GifModal from './components/GifModal';
import LoadMoreButton from './components/LoadMoreButton';
import Heading from './components/Heading';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';

describe('<BaseComponent />', () => {

  const mockProps = {
    dispatch: () => {},
    imageSearchResults: [],
    isLoading: false,
    fullImage: 'http://some.url',
    showMorePossible: true,
    searchOffset: 0,
    searchTerm: 'Michael Bolton',
    totalResultsCount: 68,
    modalIsLoading: false,
    thumbImage: {
      url: 'http://someThumb.url',
      width: '300px',
      height: '100px'
    }
  };

  it('Should render as expected', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render( <BaseComponent {...mockProps} /> );
    const ReactComponent = renderer.getRenderOutput();

    const children = ReactComponent.props.children;
    expect( children.length ).toBe( 8 );

    expect( children[0].type ).toBe( GifModal );
    expect( children[1].type ).toBe( Heading );
    expect( children[2].type ).toBe( SearchInput );
    expect( children[3].type ).toBe( SearchResults );
    expect( children[4] ).toBe( false );
    expect( children[5].type ).toBe( LoadMoreButton );
    expect( children[7].type ).toBe( 'a' );
    expect( children[7].props.href ).toEqual('https://github.com/benbowes/redux-saga-api-example/');
  });

  it('It should show an empty results message when no results', () => {
    const emptyMessageProps = {
      ...mockProps,
      totalResultsCount: 0
    };

    const renderer = ReactTestUtils.createRenderer();
    renderer.render( <BaseComponent {...emptyMessageProps} /> );
    const ReactComponent = renderer.getRenderOutput();
    const children = ReactComponent.props.children;
    expect( children[4].type ).toBe( 'p' );
    expect( children[4].props.children ).toBe( 'No GIFs here :(' );
  });

  it('It should show an empty results message when no results', () => {
    const emptyMessageProps = {
      ...mockProps,
      totalResultsCount: 0
    };

    const renderer = ReactTestUtils.createRenderer();
    renderer.render( <BaseComponent {...emptyMessageProps} /> );
    const ReactComponent = renderer.getRenderOutput();
    const children = ReactComponent.props.children;
    expect( children[4].type ).toBe( 'p' );
    expect( children[4].props.children ).toBe( 'No GIFs here :(' );
  });

  it('It should NOT show a LoadMoreButton when showMorePossible is false and totalResultsCount is more than 0', () => {
    const emptyMessageProps = {
      ...mockProps,
      showMorePossible: false,
      totalResultsCount: 1
    };

    const renderer = ReactTestUtils.createRenderer();
    renderer.render( <BaseComponent {...emptyMessageProps} /> );
    const ReactComponent = renderer.getRenderOutput();
    const children = ReactComponent.props.children;
    expect( children[3].type ).toBe( SearchResults );
    expect( children[5].type ).toBe( undefined );
  });

});
