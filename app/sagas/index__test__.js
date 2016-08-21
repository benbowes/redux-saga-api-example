import 'babel-polyfill'; // required by redux-saga for generator func's

import expect from 'expect';
import { fork } from 'redux-saga/effects';
import { rootSaga } from './index';
import { listenForDataRequests, listenForShowMoreRequests } from './apiSaga';

describe(`Saga "index"`, () => {

  it(`rootSaga will fork sagas`, () => {
    const generator = rootSaga();

    let result = generator.next();
    expect( result.value ).toEqual( [
      fork( listenForDataRequests ),
      fork( listenForShowMoreRequests )
    ] );
  });

});
