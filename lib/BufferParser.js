module.exports = BufferParser;
function BufferParser(options) {
  if (Buffer.isBuffer(options)) {
    options = {buffer: options};
  }

  this._buffer = options.buffer;
  this._offset = options.offset || 0;
}

BufferParser.prototype.uint8 = function() {
  return this._buffer.readUInt8(this._offset++);
};

BufferParser.prototype.int8 = function() {
  return this._buffer.readInt8(this._offset++);
};
