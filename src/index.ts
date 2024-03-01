
import { encode }			from '@msgpack/msgpack';
import { blake2b }			from './blake2b.js';


type Input = Record<string, any>;

export function serialize ( input: any, key_order?: Array<string> ) {
    if ( key_order )
	return serializeKeyOrder( input, key_order );
    else
	return encode( input, {
	    "sortKeys": true,
	});
}

export function serializeKeyOrder ( input: Input, key_order: Array<string> ) {
    const ordered_input : Input		= {};

    for ( let key of key_order ) {
	ordered_input[ key ]		= input[ key ];
    }

    return encode( ordered_input );
}

export function hash ( bytes: Uint8Array ) {
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

export function serializeZomeCall ( zome_call: any ) {
    return serializeKeyOrder( zome_call, ZOME_CALL_KEY_ORDER );
}

export function hashZomeCall ( zome_call: any ) {
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
