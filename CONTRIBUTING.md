# Contributing

## Running the test suite

```js
$ git clone <git url>
$ cd <clone dir>
$ npm install
$ make test
```

## Running an individual test

```js
$ node test/unit/test-Reader.js
```

## TODOS

* Implement `reader.compact()` and/or new Reader({compact: true}). Allows for
  the internal `this._buffer` to shrink. (The current behavior is to grow the
  internal buffer until it can hold the biggest buffer passed into `write()`).
