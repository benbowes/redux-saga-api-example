import 'ignore-styles';
import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { BaseComponent } from './BaseComponent';
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
    },
    recentSearches: []
  };

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
