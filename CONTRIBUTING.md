[back to README.md](README.md)

# Contributing

## Overview
This package is designed to serialize and hash [unsigned zome
call](https://docs.rs/hdk/0.1.0/hdk/prelude/struct.ZomeCallUnsigned.html) input with minimal code.


## Development

See [docs/API.md](docs/API.md) for detailed API References


### Environment

- Developed using Node.js `v18.14.2`
- Enter `nix develop` for development environment dependencies.

### Building
No build is required for Node.

Bundling with Webpack is supported for web
```
npx webpack
```

#### Optimizations

Other msgpack libraries that did not work

- `msgpack-lite` - barely reduced the compressed size (57kb -> 54kb)
- `tiny-msgpack` - serialized result was slightly different (last 8 bits)
- `@ygoe/msgpack` - serialized result was very different (approx. 80% different)


### Testing

To run all tests with logging
```
make test-debug
```

- `make test-integration-debug` - **Integration tests only**

> **NOTE:** remove `-debug` to run tests without logging
