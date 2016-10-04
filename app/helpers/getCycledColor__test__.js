import expect from 'expect';
import getCycledColor, { colors } from './getCycledColor';

describe('Helpers "getCycledColor"', () => {

  it('getCycledColor should cycle through all colors', () => {
    expect( getCycledColor(0) ).toEqual( colors[0] );
    expect( getCycledColor(1) ).toEqual( colors[1] );
    expect( getCycledColor(colors.length) ).toEqual( colors[0] );
  });

});
