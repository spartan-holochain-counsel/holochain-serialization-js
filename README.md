[![](https://img.shields.io/npm/v/@whi/holochain-serialization/latest?style=flat-square)](http://npmjs.com/package/@whi/holochain-serialization)

# Holochain Serialization
A (pure) Javascript library for signing [Holochain](https://holochain.org) zome call input.

[![](https://img.shields.io/github/issues-raw/mjbrisebois/holochain-serialization-js?style=flat-square)](https://github.com/mjbrisebois/holochain-serialization-js/issues)
[![](https://img.shields.io/github/issues-closed-raw/mjbrisebois/holochain-serialization-js?style=flat-square)](https://github.com/mjbrisebois/holochain-serialization-js/issues?q=is%3Aissue+is%3Aclosed)
[![](https://img.shields.io/github/issues-pr-raw/mjbrisebois/holochain-serialization-js?style=flat-square)](https://github.com/mjbrisebois/holochain-serialization-js/pulls)


## Overview

### Features

- Serialize objects using `@msgpack/msgpack` encoder (sorted keys)
- Hash using blake2b 256 bit digest
- Special serialization for [`ZomeCallUnsigned`](https://docs.rs/hdk/0.1.0/hdk/prelude/struct.ZomeCallUnsigned.html)
  - key order must match the Rust struct key order


## Install

```bash
npm i @whi/holochain-serialization
```

## Basic Usage

```javascript
import crypto from 'crypto';
import { AgentPubKey, DnaHash } from '@whi/holo-hash';
import { hashZomeCall, encode } from '@whi/holochain-serialization';
import ed25519 from 'some_ed25519_library'; // Not a real ed25519 library


const key_pair = ed25519.keyPair();
const agent_hash = new AgentPubKey( key_pair.publicKey );
const dna_hash = new DnaHash( crypto.randomBytes(32) );

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

zome_call_request.signature = ed25519.sign( digest, key_pair.privateKey );
```


### API Reference

See [docs/API.md](docs/API.md)

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
