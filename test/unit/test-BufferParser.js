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

  'int16BE': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var parser = new BufferParser(buffer);

    assert.equal(parser.int16BE(), 1 * 256 + 127);
    assert.equal(parser.int16BE(), -128 * 256 + 255);
  },

  'int16': function() {
    var parser = new BufferParser();
    assert.strictEqual(parser.int16, parser.int16BE);
  },

  'uint16': function() {
    var parser = new BufferParser();
    assert.strictEqual(parser.uint16, parser.uint16BE);
  },
});
