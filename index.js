var buffer = exports;

var BufferParser = require('./lib/BufferParser');

buffer.createParser = function(options) {
  return new BufferParser(options);
};
