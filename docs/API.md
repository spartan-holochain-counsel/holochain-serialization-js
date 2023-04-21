[back to README.md](../README.md)


# API Reference

### `serialize( input )`
Serialize any input using msgpack encoding with sort keys enabled

Returns `Uint8Array`

Example
```js
const bytes = serialize( "Hello world" );
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
    hash,
    serializeZomeCall,
    hashZomeCall,
    blake2b,
}
```
