var util         = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = BufferParser;
util.inherits(BufferParser, EventEmitter);
function BufferParser(options) {
  EventEmitter.call(this);

  if (Buffer.isBuffer(options)) {
    options = {buffer: options};
  }

  options = options || {};

  this.writable = true;

  this._buffer = options.buffer || new Buffer(0);
  this._offset = options.offset || 0;
  this._paused = false;
}

BufferParser.prototype.write = function(buffer) {
  this._buffer = Buffer.concat([this._buffer, buffer]);

  return !this._paused;
};

BufferParser.prototype.pause = function() {
  this._paused = true;
};

BufferParser.prototype.resume = function() {
  this._paused = false;
};

BufferParser.prototype.bytesAvailable = function() {
  return this._buffer.length - this._offset;
};

BufferParser.prototype.uint8 = function() {
  return this._buffer.readUInt8(this._offset++);
};

BufferParser.prototype.int8 = function() {
  return this._buffer.readInt8(this._offset++);
};

BufferParser.prototype.uint16BE = function() {
  this._offset += 2;
  return this._buffer.readUInt16BE(this._offset - 2);
};
BufferParser.prototype.uint16 = BufferParser.prototype.uint16BE;

BufferParser.prototype.int16BE = function() {
  this._offset += 2;
  return this._buffer.readInt16BE(this._offset - 2);
};
BufferParser.prototype.int16 = BufferParser.prototype.int16BE;

BufferParser.prototype.uint16LE = function() {
  this._offset += 2;
  return this._buffer.readUInt16LE(this._offset - 2);
};

BufferParser.prototype.int16LE = function() {
  this._offset += 2;
  return this._buffer.readInt16LE(this._offset - 2);
};

BufferParser.prototype.uint32BE = function() {
  this._offset += 4;
  return this._buffer.readUInt32BE(this._offset - 4);
};
BufferParser.prototype.uint32 = BufferParser.prototype.uint32BE;

BufferParser.prototype.int32BE = function() {
  this._offset += 4;
  return this._buffer.readInt32BE(this._offset - 4);
};
BufferParser.prototype.int32 = BufferParser.prototype.int32BE;

BufferParser.prototype.uint32LE = function() {
  this._offset += 4;
  return this._buffer.readUInt32LE(this._offset - 4);
};

BufferParser.prototype.int32LE = function() {
  this._offset += 4;
  return this._buffer.readInt32LE(this._offset - 4);
};

BufferParser.prototype.ascii = function(length) {
  return this._string('ascii', length);
};

BufferParser.prototype.utf8 = function(length) {
  return this._string('utf8', length);
};

BufferParser.prototype._string = function(encoding, length) {
  var nullTerminated = (length === undefined);
  if (nullTerminated) {
    length = this._nullDistance();
  }

  var offset = this._offset;
  this._offset += length;

  var value = this._buffer.toString(encoding, offset, this._offset);

  if (nullTerminated) {
    this._offset++;
  }

  return value;
};

BufferParser.prototype._nullDistance = function() {
  for (var i = this._offset; i < this._buffer.length; i++) {
    var byte = this._buffer[i];
    if (byte === 0) {
      return i - this._offset;
    }
  }
};
