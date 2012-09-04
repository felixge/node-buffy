# buffy (The Buffer Slayer)

A module to encode / decode binary data and streams.

## Usage

Let's say you want to parse a simple C struct, buffy can help:

```js
var buffy = require('buffy');

var buffer = new Buffer([23, 0, 0, 0, 15, 116, 101, 115, 116]);
var parser = buffy.createParser(buffer);

var struct = {
  version : parser.uint8(),
  id      : parser.uint32(),
  name    : parser.ascii(4),
};

// {version: 23, id: 15, name: 'test'}
```

Parsing a buffer is nice, but what about streams? Well, buffy has your back:

```js
var buffy      = require('buffy');
var net        = require('net');
var connection = net.createConnection(1337, 'example.org');

var parser = buffy.createParser();
connection.pipe(parser);

parser.on('data', function() {
  while (parser.bytesAvailable() >= 9) {
    var struct = {
      version : parser.uint8(),
      id      : parser.uint32(),
      name    : parser.ascii(4),
    };
  }
});
```

## API

### parser.write(buffer)

Appends the given `buffer` to the internal buffer.

### parser.bytesAvailable(buffer)

Returns the number of internally buffered bytes that have not yet been consumed.

### parser.int8() / parser.uint8()

Returns the next (un)signed 8 bit integer.

### parser.int16BE() / parser.uint16BE() / parser.int16LE() / parser.uint16LE()

Returns the next (un)signed 16 bit integer in the chosen endianness.

### parser.ascii([bytes]) / parser.utf8([bytes])

Returns the next `bytes` as a string of the chosen encoding. If `bytes` is
omitted, a null terminated string is assumed.

### parser.buffer([bytes])

Returns the next `bytes` as a buffer.

## Error Handling

The parser will throw an exception whenever an operation exceeds the boundary
of the internal buffer.
