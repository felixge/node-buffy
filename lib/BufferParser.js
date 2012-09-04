module.exports = BufferParser;
function BufferParser(options) {
  if (Buffer.isBuffer(options)) {
    options = {buffer: options};
  }

  options = options || {};

  this._buffer = options.buffer;
  this._offset = options.offset || 0;
}

BufferParser.prototype.int8 = function() {
  return this._buffer.readInt8(this._offset++);
};

BufferParser.prototype.uint8 = function() {
  return this._buffer.readUInt8(this._offset++);
};

BufferParser.prototype.int16BE = function() {
  this._offset += 2;
  return this._buffer.readInt16BE(this._offset - 2);
};
BufferParser.prototype.int16 = BufferParser.prototype.int16BE;

BufferParser.prototype.uint16BE = function() {
  this._offset += 2;
  return this._buffer.readUInt16BE(this._offset - 2);
};
BufferParser.prototype.uint16 = BufferParser.prototype.uint16BE;
