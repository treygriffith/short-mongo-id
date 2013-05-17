var utils = require('./utils');
var ObjectId = require('bson').ObjectId;

function ObjectIdToShortId(id) {
  var str = "";

  // make sure it's an ObjectId, not just a string
  id = new ObjectId(String(id));

  // creation date
  var date = id.getTimestamp();

  // time in milliseconds (with precision in seconds)
  var time = date.getTime();

  // hexadecimal counter converted to a decimal
  var counter = parseInt(id.toHexString().slice(-6), 16);

  // only use the last 3 digits of the counter to serve as our "milliseconds"
  counter = parseInt(counter.toString().slice(-3), 10);

  // add counter as our millisecond precision to our time
  time = time + counter;

  // convert to 64 base string (not strict base64)
  str = utils.toBase(time, 64);

  // slice off the first, least variating, character
  // this lowers the entropy, but brings us to 6 characters, which is nice.
  // This will cause a roll-over once every two years, but the counter and the rest of the timestamp should make it unique (enough)
  str = str.slice(1);

  // reverse the string so that the first characters have the most variation
  str = utils.reverse(str);

  return str;
}

module.exports = ObjectIdToShortId;
