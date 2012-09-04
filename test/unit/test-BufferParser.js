var common       = require('../common');
var test         = require('utest');
var assert       = require('assert');
var BufferParser = require(common.lib + '/BufferParser');

test('BufferParser', {
  'options.offset': function() {
    var buffer = new Buffer([0, 127]);
    var parser = new BufferParser({buffer: buffer, offset: 1});

    assert.equal(parser.uint8(), 127);
  },

  'uint8': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var parser = new BufferParser(buffer);

    assert.equal(parser.uint8(), 1);
    assert.equal(parser.uint8(), 127);
    assert.equal(parser.uint8(), 128);
    assert.equal(parser.uint8(), 255);
  },

  'int8': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var parser = new BufferParser(buffer);

    assert.equal(parser.int8(), 1);
    assert.equal(parser.int8(), 127);
    assert.equal(parser.int8(), -128);
    assert.equal(parser.int8(), -1);
  },

  'uint16BE': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var parser = new BufferParser(buffer);

    assert.equal(parser.uint16BE(), 1 * 256 + 127);
    assert.equal(parser.uint16BE(), 128 * 256 + 255);
  },

  'uint16: alias for uint16BE': function() {
    var parser = new BufferParser();
    assert.strictEqual(parser.uint16, parser.uint16BE);
  },


  'int16BE': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var parser = new BufferParser(buffer);

    assert.equal(parser.int16BE(), 1 * 256 + 127);
    assert.equal(parser.int16BE(), -128 * 256 + 255);
  },

  'int16: alias for int16BE': function() {
    var parser = new BufferParser();
    assert.strictEqual(parser.int16, parser.int16BE);
  },

  'uint32BE': function() {
    var buffer = new Buffer([1, 2, 3, 4, 5, 6, 7, 8]);
    var parser = new BufferParser(buffer);

    assert.equal(parser.uint32BE(), 1 * (256 * 256 * 256) + 2 * (256 * 256) + 3 * (256) + 4);
    assert.equal(parser.uint32BE(), 5 * (256 * 256 * 256) + 6 * (256 * 256) + 7 * (256) + 8);
  },

  'uint32: alias for uint32BE': function() {
    var parser = new BufferParser();
    assert.strictEqual(parser.uint32, parser.uint32BE);
  },

  'int32BE': function() {
    var buffer = new Buffer([1, 2, 3, 4, 255, 254, 253, 252]);
    var parser = new BufferParser(buffer);

    assert.equal(parser.int32BE(), 1 * (256 * 256 * 256) + 2 * (256 * 256) + 3 * (256) + 4);
    assert.equal(parser.int32BE(), (255 * (256 * 256 * 256) + 254 * (256 * 256) + 253 * (256) + 252) - 0xffffffff - 1);
  },

  'int32: alias for int32BE': function() {
    var parser = new BufferParser();
    assert.strictEqual(parser.int32, parser.int32BE);
  },

  'ascii: fixed length ascii': testParseFixedLengthAsciiWith('ascii'),
  'ascii: fixed length snowman': testParseFixedLengthSnowmanWith('ascii'),
  'ascii: null terminated ascii': testParseNullTerminatedAsciiWith('ascii'),

  'utf8: fixed length ascii': testParseFixedLengthAsciiWith('utf8'),
  'utf8: fixed length snowman': testParseFixedLengthSnowmanWith('utf8'),
  'utf8: null terminated ascii': testParseNullTerminatedAsciiWith('utf8'),
});

function testParseFixedLengthAsciiWith(encoding) {
  return function() {
    var buffer = new Buffer([
      'a'.charCodeAt(),
      'b'.charCodeAt(),
      'c'.charCodeAt(),
      'd'.charCodeAt(),
      'e'.charCodeAt(),
    ]);
    var parser = new BufferParser(buffer);

    assert.equal(parser[encoding](3), 'abc');
    assert.equal(parser[encoding](2), 'de');
  };
}

function testParseFixedLengthSnowmanWith(encoding) {
  return function() {
    var buffer = new Buffer('\u2603', 'utf8');
    var parser = new BufferParser(buffer);

    assert.equal(parser[encoding](3), '☃');
  };
}

function testParseNullTerminatedAsciiWith(encoding) {
  return function() {
    var buffer = new Buffer([
      'a'.charCodeAt(),
      'b'.charCodeAt(),
      'c'.charCodeAt(),
      0,
      'd'.charCodeAt(),
      'e'.charCodeAt(),
      0,
    ]);
    var parser = new BufferParser(buffer);

    assert.equal(parser[encoding](), 'abc');
    assert.equal(parser[encoding](), 'de');
  };
}
