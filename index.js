const SECONDS_IN_DAY = 86400;

module.exports = {
   toSeconds(hoursIn, minutesIn, meridianIn){
    let hours = Number(hoursIn);
    let minutes = Number(minutesIn);
    let meridian = meridianIn.toUpperCase();
    
    if( meridian !== 'AM' && meridian !== 'PM' ){
      throw new Error('meridian must be a string of either "AM" or "PM"');
    }
    
    // convert to 24 hour
    if( hours === 12 && meridian === 'AM' ){
      hours = 0;
    }else if( meridian === 'PM' ){
      hours += 12;
    }
    
    let value = hours*60*60 + minutes*60;
    
    // handle negatives
    if( value < -1 ){
      value = SECONDS_IN_DAY - (Math.abs(value) % SECONDS_IN_DAY);
    }
    
    return value;
    
  },

  toReadableTime(seconds){
    
    seconds = Number(seconds) % SECONDS_IN_DAY;
    
    if( seconds < -1 ){
      seconds = SECONDS_IN_DAY - (Math.abs(seconds) % SECONDS_IN_DAY);
    }
    
    let hours = Math.floor(seconds/60/60);
    let minutes = Math.floor( (seconds - hours*60*60)/60 );
    
    // convert to 12 hour
    if ( hours === 0 ){
      hours = 12;
    }else{
      hours = hours % 12;
    }
    
    let meridian = seconds < 43200 ? 'AM' : 'PM';
    
    // deal with minutes
    if( minutes < 10 ){
      minutes = '0' + minutes
    }
    
    return {
      hours: String(hours),
      minutes: String(minutes),
      meridian
    };
    
  }
};