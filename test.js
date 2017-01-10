import { expect } from 'chai';
import { toSeconds, toReadableTime } from '.';


describe('To seconds from values', () => {
  const tests = [
    { args: [ 2, '05', 'pm' ],   expected: 50700 },   
    { args: [ 12, '00', 'am' ],  expected: 0 },     
    { args: [ 12, 15, 'aM' ],    expected: 900 },   
    { args: [ '03', '15', 'AM'], expected: 11700 },     
    { args: [ '12', '15', 'PM'], expected: 44100 },     
    { args: [ -1, '00', 'AM'],   expected: toSeconds( 11, '00', 'PM' ) }, 
    { args: [ '13', '05', 'AM'], expected: toSeconds( 1, '05', 'PM' ) },
    { args: [ 2, -5, 'AM' ],     expected: toSeconds( 1, 55, 'AM' ) }, 
    { args: [ 2, -68, 'AM' ],    expected: toSeconds( 12, '52', 'AM' ) }
  ];
  tests.forEach(function(test) {
    it(`should convert ${test.args} to seconds`, () => {
      expect( toSeconds(...test.args)).to.equal( test.expected );
    });
  })
});


describe('To values from seconds', () => {
  const tests = [
    { value: 50700, expected: { hours: '2', minutes: '05', meridian: 'PM' } },   
    { value: 0,     expected: { hours: '12', minutes: '00', meridian: 'AM' } },     
    { value: 900,   expected: { hours: '12', minutes: '15', meridian: 'AM' } },   
    { value: 11700, expected: { hours: '3', minutes: '15', meridian: 'AM' } },     
    { value: 91800, expected: { hours: '1', minutes: '30', meridian: 'AM' } },     
    { value: -3600, expected: { hours: '11', minutes: '00', meridian: 'PM' } }
  ];
  tests.forEach(function(test) {
    it(`should convert ${test.value} to value`, () => {
      expect( toReadableTime(test.value)).to.deep.equal( test.expected );
    });
  });
});


describe('Round trip conversion', () => {
  const tests = [
    { value: { hours: '2', minutes: '05', meridian: 'PM' }, expected: { hours: '2', minutes: '05', meridian: 'PM' } },   
    { value: { hours: '12', minutes: '00', meridian: 'AM' },     expected: { hours: '12', minutes: '00', meridian: 'AM' } },     
    { value: { hours: '13', minutes: '15', meridian: 'AM' },   expected: { hours: '1', minutes: '15', meridian: 'PM' } },   
    { value: { hours: '13', minutes: '15', meridian: 'PM' }, expected: { hours: '1', minutes: '15', meridian: 'AM' } }
    { value: { hours: '12', minutes: '60', meridian: 'PM' }, expected: { hours: '1', minutes: '15', meridian: 'AM' } }
  ];
  tests.forEach(function(test) {
    it(`should convert ${Object.values(test.value)} to value`, () => {
      expect( 
        toReadableTime(toSeconds(test.value))
      ).to.deep.equal( test.expected );
    });
  });
});



