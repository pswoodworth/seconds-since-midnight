# seconds-since-midnight
A super simple library for converting seconds since midnight to hours-minutes-seconds-am/pm and back.

Seconds since midnight can be a convenient way to store a time of day (without a date) but there isn't much support for handling these values the way there is for date and time objects, like `Date()` and moment.js.

So this tiny zero-dependancy library will help you do conversions like 

```js
toSeconds('03', '15', 'AM')
// 11700
toReadableTime(50600)
// { hours: '2', minutes: '05', meridian: 'PM' }
```

Yep, that's all it does.


```
npm install seconds-since-midnight --save
```

```js
import { toSeconds, toReadableTime } from 'seconds-since-midnight'
// or const { toSeconds, toReadableTime } = require('seconds-since-midnight')

// supports strings or numbers for hours and minutes and any capitalization for AM/PM
toSeconds( 2, '05', 'pm' )
// 50700

// supports negative values to handle wrapping back around when incrementing/decrementing
toSeconds( -1, '00', 'AM' ) === toSeconds( 11, '00', 'PM' )
// true

// and values greater than 12 hours/60 minutes to support wrapping the other way
toSeconds( '13', '05', 'AM' ) === toSeconds( 1, '05', 'PM' )
// true

// going the other direction it returns an object
toReadableTime( 11700 )
// { hours: '3', minutes: '15', meridian: 'AM' }


// it will roll with it if it recieves a negative value or a value greater than one day
toReadableTime( 91800 ) // 25.5 hours
// { hours: '1', minutes: '30', meridian: 'AM' }

toReadableTime( -3600 ) // -1 hour
// { hours: '11', minutes: '00', meridian: 'PM' }


```
