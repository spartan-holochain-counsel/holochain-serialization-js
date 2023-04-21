
import { encode }			from '@msgpack/msgpack';
import { blake2b }			from './blake2b.js';


export function serialize ( input ) {
    return encode( input, {
	"sortKeys": true,
    });
}

export function hash ( bytes ) {
    if ( !(bytes instanceof Uint8Array) )
	bytes				= serialize( bytes );

    return blake2b( bytes );
}


const key_order				= [
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
    const ordered_zome_call		= {};

    for ( let key of key_order ) {
	ordered_zome_call[ key ]	= zome_call[ key ];
    }

    return encode( ordered_zome_call );
}

export function hashZomeCall ( zome_call ) {
    const bytes				= serializeZomeCall( zome_call );

    return hash( bytes );
}


export default {
    serialize,
    hash,
    serializeZomeCall,
    hashZomeCall,
    blake2b,
};
