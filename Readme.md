# buffer-parser

## API

### parser.int8()
### parser.uint8()

Returns the next (un)signed 8 bit integer.

### parser.int16()
### parser.uint16()
### parser.int16LE()
### parser.uint16BE()

Returns the next (un)signed 16 bit integer. Uses the parser endianess unless
invoked with LE/BE suffix.
