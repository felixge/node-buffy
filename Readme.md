# buffy (The Buffer Slayer)

A module to encode / decode binary data and streams.

## Usage

Let's say you want to parse a simple C struct, buffy can help:

```js
var buffy = require('buffy');

var buffer = new Buffer([23, 0, 0, 0, 15, 116, 101, 115, 116, 0]);
var parser = buffy.createParser(buffer);

var struct = {
  version : parser.uint8(),
  id      : parser.uint32(),
  name    : parser.string(),
};

// {version: 23, id: 15, name: 'test'}
```

## API

### parser.int8() / parser.uint8()

Returns the next (un)signed 8 bit integer.

### parser.int16() / parser.uint16() / parser.int16LE() / parser.uint16BE()

Returns the next (un)signed 16 bit integer. Defaults to big endian unless
invoked with LE/BE suffix.
