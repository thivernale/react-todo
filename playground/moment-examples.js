/*
 * install moment third-party library:
 * npm install moment@2.12.0 --save-dev
 */

var moment = require('moment');

// call as a function to return instance of it
// get current date and time
console.log(moment().format());

// January 1st 1970 @ 12:00am -> 0 - Unix timestamp

var now = moment();

console.log('Current timestamp', now.unix());

var timestamp = 1547414930;
// convert to a moment object
var currentMoment = moment.unix(timestamp);

// format: http://momentjs.com/docs/#/displaying/
console.log('Current moment', currentMoment.format('MMM D, YY @ h:mm a'));

// January 13th, 2019 @ 23:36 AM
console.log('Current moment', currentMoment.format('MMMM Do, YYYY @ h:mm A'));

