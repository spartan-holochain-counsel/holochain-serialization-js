
import { encode }			from '@msgpack/msgpack';
import { blake2b }			from './blake2b.js';


export function serialize ( input, key_order ) {
    if ( key_order )
	return serializeKeyOrder( input, key_order );
    else
	return encode( input, {
	    "sortKeys": true,
	});
}

export function serializeKeyOrder ( input, key_order ) {
    const ordered_input			= {};

    for ( let key of key_order ) {
	ordered_input[ key ]		= input[ key ];
    }

    return encode( ordered_input );
}

export function hash ( bytes ) {
    if ( !(bytes instanceof Uint8Array) )
	bytes				= serialize( bytes );

    return blake2b( bytes );
}


const ZOME_CALL_KEY_ORDER		= [
    "provenance",
    "cell_id",
    "zome_name",
    "fn_name",
    "cap_secret",
    "payload",
    "nonce",
    "expires_at",
];

export function serializeZomeCall ( zome_call ) {
    return serializeKeyOrder( zome_call, ZOME_CALL_KEY_ORDER );
}

export function hashZomeCall ( zome_call ) {
    const bytes				= serializeZomeCall( zome_call );

    return hash( bytes );
}


export default {
    serialize,
    serializeKeyOrder,
    hash,
    serializeZomeCall,
    hashZomeCall,
    blake2b,
};
