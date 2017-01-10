'use strict';
var SECONDS_IN_DAY = 86400;

module.exports = {
   toSeconds: function(){
    var hours;
    var minutes;
    var meridian;
    if( typeof arguments[0] === 'object' ){
      hours = arguments[0].hours;
      minutes = arguments[0].minutes;
      meridian = arguments[0].meridian;
    }else{
      hours = arguments[0];
      minutes = arguments[1];
      meridian = arguments[2];
    }
    
    hours = Number(hours);
    minutes = Number(minutes);
    meridian = meridian.toUpperCase();

    if( meridian !== 'AM' && meridian !== 'PM' ){
      console.warn('meridian must be a string of either "AM" or "PM"');
    }

    // convert to 24 hour
    if( hours === 12 && meridian === 'AM' ){
      hours = 0;
    }

    if( hours !== 12 && meridian === 'PM' ){
      hours += 12;
    }

    var value = hours*60*60 + minutes*60;

    // handle negatives
    if( value < -1 ){
      value = SECONDS_IN_DAY - (Math.abs(value) % SECONDS_IN_DAY);
    }

    return value;
    
  },

  toReadableTime: function(seconds){
    
    seconds = Number(seconds) % SECONDS_IN_DAY;
    
    if( seconds < -1 ){
      seconds = SECONDS_IN_DAY - (Math.abs(seconds) % SECONDS_IN_DAY);
    }
    
    var hours = Math.floor(seconds/60/60);
    var minutes = Math.floor( (seconds - hours*60*60)/60 );
    
    // convert to 12 hour
    if ( hours === 0 ){
      hours = 12;
    }else{
      hours = hours % 12;
    }
    
    var meridian = seconds < 43200 ? 'AM' : 'PM';
    
    // deal with minutes
    if( minutes < 10 ){
      minutes = '0' + minutes
    }
    
    return {
      hours: String(hours),
      minutes: String(minutes),
      meridian: meridian
    };
    
  }
};