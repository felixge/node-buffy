var util         = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = Reader;
util.inherits(Reader, EventEmitter);
function Reader(options) {
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

Reader.prototype.write = function(buffer) {
  this._buffer = Buffer.concat([this._buffer, buffer]);

  return !this._paused;
};

Reader.prototype.pause = function() {
  this._paused = true;
};

Reader.prototype.resume = function() {
  this._paused = false;
};

Reader.prototype.bytesAhead = function() {
  return this._buffer.length - this._offset;
};

Reader.prototype.uint8 = function() {
  return this._buffer.readUInt8(this._offset++);
};

Reader.prototype.int8 = function() {
  return this._buffer.readInt8(this._offset++);
};

Reader.prototype.uint16BE = function() {
  this._offset += 2;
  return this._buffer.readUInt16BE(this._offset - 2);
};

Reader.prototype.int16BE = function() {
  this._offset += 2;
  return this._buffer.readInt16BE(this._offset - 2);
};

Reader.prototype.uint16LE = function() {
  this._offset += 2;
  return this._buffer.readUInt16LE(this._offset - 2);
};

Reader.prototype.int16LE = function() {
  this._offset += 2;
  return this._buffer.readInt16LE(this._offset - 2);
};

Reader.prototype.uint32BE = function() {
  this._offset += 4;
  return this._buffer.readUInt32BE(this._offset - 4);
};

Reader.prototype.int32BE = function() {
  this._offset += 4;
  return this._buffer.readInt32BE(this._offset - 4);
};

Reader.prototype.uint32LE = function() {
  this._offset += 4;
  return this._buffer.readUInt32LE(this._offset - 4);
};

Reader.prototype.int32LE = function() {
  this._offset += 4;
  return this._buffer.readInt32LE(this._offset - 4);
};

Reader.prototype.float32BE = function() {
  this._offset += 4;
  return this._buffer.readFloatBE(this._offset - 4);
};

Reader.prototype.float32LE = function() {
  this._offset += 4;
  return this._buffer.readFloatLE(this._offset - 4);
};

Reader.prototype.double64BE = function() {
  this._offset += 8;
  return this._buffer.readDoubleBE(this._offset - 8);
};

Reader.prototype.double64LE = function() {
  this._offset += 8;
  return this._buffer.readDoubleLE(this._offset - 8);
};

Reader.prototype.ascii = function(bytes) {
  return this._string('ascii', bytes);
};

Reader.prototype.utf8 = function(bytes) {
  return this._string('utf8', bytes);
};

Reader.prototype._string = function(encoding, bytes) {
  var nullTerminated = (bytes === undefined);
  if (nullTerminated) {
    bytes = this._nullDistance();
  }

  var offset = this._offset;
  this._offset += bytes;

  var value = this._buffer.toString(encoding, offset, this._offset);

  if (nullTerminated) {
    this._offset++;
  }

  return value;
};

Reader.prototype._nullDistance = function() {
  for (var i = this._offset; i < this._buffer.length; i++) {
    var byte = this._buffer[i];
    if (byte === 0) {
      return i - this._offset;
    }
  }
};

Reader.prototype.buffer = function(bytes) {
  this._offset += bytes;
  return this._buffer.slice(this._offset - bytes, this._offset);
};
