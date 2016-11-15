import expect from 'expect';
import * as actionTypes from '../constants/actionTypes';
import {
  getSearchOffset,
  getShowMorePossible,
  imageSearch,
  initialState
} from './imageSearch';

describe(`Reducers "getSearchOffset" function`, () => {

  it(`Returns searchOffset plus 25 if that is less than the total_count of results`, () => {
    let result = getSearchOffset(10, { pagination: { total_count:50 } });
    expect(result).toBe(35);
  });

  it(`Returns total_count if searchOffset plus 25, is more than the total_count of results`, () => {
    let result = getSearchOffset(35, { pagination: { total_count:50 } });
    expect(result).toBe(50);
  });

});

describe(`Reducers "getShowMorePossible" function`, () => {

  it(`Returns true if searchOffset plus 25 is less than the total_count of results`, () => {
    let result = getShowMorePossible(10, { pagination: { total_count:50 } });
    expect(result).toBe(true);
  });

  it(`Returns false if searchOffset plus 25, is more than the total_count of results`, () => {
    let result = getShowMorePossible(35, { pagination: { total_count:50 } });
    expect(result).toBe(false);
  });

});

describe(`Reducers "imageSearch"`, () => {

  it(`It should return default state`, () => {
    const result = imageSearch(undefined, {});
    expect(result).toEqual(initialState);
  });

  it(`It should set isLoading:true when REQUEST_SEARCH_DATA`, () => {
    const result = imageSearch(undefined, {
      type: actionTypes.REQUEST_SEARCH_DATA,
      payload: {
        searchOffset: 0,
        searchTerm: 'Some search term'
      }
    });
    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      searchOffset: 0,
      searchTerm: 'Some search term'
    });
  });

  it(`It should set isLoading:true when REQUEST_SHOW_MORE`, () => {
    const result = imageSearch(initialState, {
      type: actionTypes.REQUEST_SHOW_MORE,
      payload: {
        searchOffset: 50,
        searchTerm: 'Some search term'
      }
    });
    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      searchOffset: 50,
      searchTerm: 'Some search term'
    });
  });

  it(`It should set state as expected when RECEIVE_SEARCH_DATA`, () => {
    const result = imageSearch(initialState, {
      type: actionTypes.RECEIVE_SEARCH_DATA,
      payload: {
        receivedData: {
          data: [{
            images: {
              fixed_width: { url: 'http://media3.giphy.com/media/654321/200w.gif' }
            }
          },{
            images: {
              fixed_width: { url: 'http://media3.giphy.com/media/123456/200w.gif' }
            }
          }],
          pagination: {
            total_count: 3401,
            count: 25,
            offset: 0
          }
        }
      }
    });
    expect(result).toEqual({
      ...initialState,
      images: [{
        images: {
          fixed_width: { url: 'http://media3.giphy.com/media/654321/200w.gif' }
        }
      },{
        images: {
          fixed_width: { url: 'http://media3.giphy.com/media/123456/200w.gif' }
        }
      }],
      showMorePossible: true,
      searchOffset: 25,
      totalResultsCount: 3401
    });
  });

  it(`It should set isLoading:false when RECEIVE_SEARCH_DATA_FAILED`, () => {
    const result = imageSearch(initialState, {
      type: actionTypes.RECEIVE_SEARCH_DATA_FAILED,
      payload: {
        error: {Some: 'error'},
        failedAction: {
          type: actionTypes.REQUEST_SEARCH_DATA,
          payload: { searchOffset: 0, searchTerm: 'Some search term' }
        }
      }
    });

    expect(result).toEqual({
      ...initialState,
      isLoading: false
    });
  });

});
