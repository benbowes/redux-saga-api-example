import 'babel-polyfill'; // required by redux-saga for generator func's
import expect from 'expect';
import { take, call, put } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchData, listenForDataRequests } from './apiSaga';
import { fetchJsonWrapper } from './helpers/fetchJsonWrapper';

describe(`Saga "apiSaga"`, () => {

  it(`It'll cycle through listenForDataRequests() forever...`, () => {

    const generator = listenForDataRequests();

    let result = generator.next();

    expect( result.value ).toEqual( take( actionTypes.REQUEST_SEARCH_DATA ) );

    result = generator.next();

    expect( result.value.FORK.fn ).toEqual( fetchData );

    result = generator.next();

    // Cycles back to first step in saga
    expect( result.value ).toEqual( take( actionTypes.REQUEST_SEARCH_DATA ) );

    // And is still active
    expect( result.done ).toEqual( false );

  });

  it(`It'll get search data...`, () => {

    const action = {
      type: actionTypes.REQUEST_SEARCH_DATA,
      payload: {
        url: 'http://someurl.com',
        searchTerm: 'Some search term'
      }
    };

    const generator = fetchData(action);

    let result = generator.next();

    expect( result.value ).toEqual( call(fetchJsonWrapper, action.payload.url) );

    expect( result.value.CALL.fn ).toEqual( fetchJsonWrapper );

    expect( result.value.CALL.args ).toEqual( 'http://someurl.com' );

    result = generator.next({ 'some': 'data', 'ok': true });

    expect( result.value ).toEqual(
      put({
        type: actionTypes.RECEIVE_SEARCH_DATA,
        payload: {
          receivedData: {
            'some': 'data',
            'ok': true
          },
          searchTerm: 'Some search term'
        }
      })
    );

    result = generator.next();

    expect( result.done ).toEqual( true );

  });

  it(`It'll pass the error and failed action when an api call fails...`, () => {
    const action = {
      type: actionTypes.REQUEST_SEARCH_DATA,
      payload: {
        url: 'http://someurl.com',
        searchTerm: 'Some search term'
      }
    };

    const generator = fetchData( action );

    generator.next();

    let result = generator.throw({ error: 'File not found' }).value;

    expect( result.PUT.action.type )
      .toEqual( actionTypes.RECEIVE_SEARCH_DATA_FAILED );

    expect( result.PUT.action.payload.error )
      .toEqual({ error: 'File not found' });

    expect( result.PUT.action.payload.failedAction )
      .toEqual({
        type: actionTypes.REQUEST_SEARCH_DATA,
        payload: {
          url: 'http://someurl.com',
          searchTerm: 'Some search term'
        }
      });

    result = generator.next();

    expect( result.done ).toEqual( true );

  });

});
