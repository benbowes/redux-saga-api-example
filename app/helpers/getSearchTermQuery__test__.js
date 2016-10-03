import expect from 'expect';
import getSearchTermQuery from './getSearchTermQuery';

describe('Helpers "getSearchTermQuery"', () => {

  it('getSearchTermQuery replace spaces with plus signs', () => {
    expect( getSearchTermQuery('1 2 3 4 5') ).toEqual('1+2+3+4+5');
  });

});
