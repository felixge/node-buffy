# buffy (The Buffer Slayer)

A module to encode / decode binary data and streams.

## Usage

Let's say you want to parse a simple C struct:

```js
var buffy = require('buffy');

var buffer = new Buffer([8, 23]);
var parser = buffy.createParser(buffer);

var struct = parser.struct([
  'unit8', 'length',
  'unit8', 'version',
]);

// {length: 8, version: 23}
```

## API

### parser.int8() / parser.uint8()

Returns the next (un)signed 8 bit integer.

### parser.int16() / parser.uint16() / parser.int16LE() / parser.uint16BE()

Returns the next (un)signed 16 bit integer. Defaults to big endian unless
invoked with LE/BE suffix.
