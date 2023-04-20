import { Logger }			from '@whi/weblogger';
const log				= new Logger("test-basic", process.env.LOG_LEVEL );

import crypto				from 'crypto';
import path				from 'path';
import { expect }			from 'chai';

import { encode, decode }		from '@msgpack/msgpack';
import { hashZomeCall }			from '@holochain/serialization';
import HoloHashLib			from '@whi/holo-hash';

const { HoloHash,
	DnaHash,
	AgentPubKey }			= HoloHashLib;

import { expect_reject }		from './utils.js';
import lib				from '../../src/index.js';


let conn;
let dna_hash;
let agent_hash;
let app_port;


function connection_tests () {

    it("should serialize/hash zome call input", async function () {
	this.timeout( 5_000 );

	const dna_hash			= new DnaHash( crypto.randomBytes( 32 ) );
	const agent_hash		= new AgentPubKey( crypto.randomBytes( 32 ) );

	const zome_call_request		= {
	    "cap_secret":	null,
	    "cell_id":		[ dna_hash, agent_hash ],
	    "zome_name":	"mere_memory",
	    "fn_name":		"save_bytes",
	    "payload":		encode( Buffer.from("Super important bytes") ),
	    "provenance":	agent_hash,
	    "nonce":		crypto.randomBytes( 32 ),
	    "expires_at":	(Date.now() + (5 * 60 * 1_000)) * 1_000,
	};

	const hash_1			= lib.hashZomeCall( zome_call_request );
	const hash_2			= await hashZomeCall( zome_call_request );

	log.normal("Pure Hash 1:", Buffer.from(hash_1).toString("hex") );
	log.normal("WASM Hash 2:", Buffer.from(hash_2).toString("hex") );

	expect( hash_1			).to.deep.equal( hash_2 );
    });
}

function errors_tests () {
}

describe("Integration: Connection", () => {

    describe("Connection",	connection_tests );
    describe("Errors",		errors_tests );

});
