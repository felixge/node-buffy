# buffy (The Buffer Slayer)

A module to encode / decode binary data and streams.

## API

### parser.int8() / parser.uint8()

Returns the next (un)signed 8 bit integer.

### parser.int16() / parser.uint16() / parser.int16LE() / parser.uint16BE()

Returns the next (un)signed 16 bit integer. Defaults to big endian unless
invoked with LE/BE suffix.
