[back to README.md](../README.md)


# API Reference

### `serialize( input, key_order )`
Serialize any input using msgpack encoding

- `input` - **(required)** any input that can be msgpack'ed
- `key_order` - **(optional)** a list of ordered keys
  - default to use msgpack sort keys

Returns `Uint8Array`

Example
```js
const bytes = serialize( "Hello world" );
```


### `serializeKeyOrder( input, key_order )`
Serialize any input using msgpack encoding with sort keys enabled

- `input` - **(required)** any input that can be msgpack'ed
- `key_order` - **(required)** a list of ordered keys

Returns `Uint8Array`

Example
```js
const bytes = serializeKeyOrder({
    "3": null,
    "two": null,
    "one": null,
    "4": null,
}, [ "one", "two", "3", "4" ] );
```


### `hash( input )`
Hash any input using `serialize`.

Returns `Uint8Array(32)`

Example
```js
const digest = hash( "Hello world" );
```


### `serializeZomeCall( zome_call_unsigned )`
Serialize unsigned zome call input with keys sorted according to the [Rust
equivalent](https://docs.rs/hdk/0.1.0/hdk/prelude/struct.ZomeCallUnsigned.html)

Returns `Uint8Array`

Example
```js
const zome_call_request = {
    "cap_secret": null,
    "cell_id": [ dna_hash, agent_hash ],
    "zome_name": "zome",
    "fn_name": "function",
    "payload": encode( null ),
    "provenance": agent_hash,
    "nonce": crypto.randomBytes( 32 ),
    "expires_at": (Date.now() + (5 * 60 * 1_000)) * 1_000,
};

const bytes = serializeZomeCall( zome_call_request );
```


### `hashZomeCall( zome_call_unsigned )`
Hash input using `serializeZomeCall`.

Returns `Uint8Array(32)`

Example
```js
const zome_call_request = {
    "cap_secret": null,
    "cell_id": [ dna_hash, agent_hash ],
    "zome_name": "zome",
    "fn_name": "function",
    "payload": encode( null ),
    "provenance": agent_hash,
    "nonce": crypto.randomBytes( 32 ),
    "expires_at": (Date.now() + (5 * 60 * 1_000)) * 1_000,
};

const digest = hashZomeCall( zome_call_request );
```


## Module exports
```javascript
{
    serialize,
    serializeKeyOrder,
    hash,
    serializeZomeCall,
    hashZomeCall,
    blake2b,
}
```
