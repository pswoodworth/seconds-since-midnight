import { expect } from 'chai';
import { toSeconds, toReadableTime } from '.';


describe('toSeconds', () => {
  expect( toSeconds( 2, '05', 'pm' ) ).to.equal(50700);
  expect( toSeconds( 12, '00', 'am' ) ).to.equal(0);
  expect( toSeconds( 12, 15, 'aM' ) ).to.equal(900);
  expect( toSeconds( '03', '15', 'AM' ) ).to.equal(11700);
  expect( toSeconds( -1, '00', 'AM' ) ).to.equal( toSeconds( 11, '00', 'PM' ) );
  expect( toSeconds( 2, -5, 'AM' ) ).to.equal( toSeconds( 1, 55, 'AM' ) );
  expect( toSeconds( 2, -68, 'AM' ) ).to.equal( toSeconds( 12, '52', 'AM' ) );
});

describe('toReadableTime', ()=> {
  expect( toReadableTime( 50700 ) ).to.deep.equal({ hours: '2', minutes: '05', meridian: 'PM' });
  expect( toReadableTime( 0 ) ).to.deep.equal({ hours: '12', minutes: '00', meridian: 'AM' });
  expect( toReadableTime( 900 ) ).to.deep.equal({ hours: '12', minutes: '15', meridian: 'AM' });
  expect( toReadableTime( 11700 ) ).to.deep.equal({ hours: '3', minutes: '15', meridian: 'AM' });
  expect( toReadableTime( 91800 ) ).to.deep.equal({ hours: '1', minutes: '30', meridian: 'AM' });
});

describe('roundTrip', () => {
  expect( toReadableTime( toSeconds( 2, '05', 'pm' ) ) ).to.deep.equal({ hours: '2', minutes: '05', meridian: 'PM' });
});
