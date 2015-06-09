var fs = require('fs'),
	events = require('events');

var config = {
    rpchost: "127.0.0.1",
    rpcport: 44555,
    rpcuser: "testnet_user",
    rpcpassword: "testnet_pass"
};
ca = fs.readFileSync('./test/test.crt')
options = {
      host: config.rpchost,
      port: config.rpcport,
      user: config.rpcuser,
      pass: config.rpcpassword,
      passphrasecallback: function () { return "passphrasecallback";},
      https: true,
      ca: ca
    };
var groestlcoin = require('../lib/groestlcoin')(options);

exports.get = function (test) {
	var options_keys = Object.keys(options);

	var num_propt = Object.keys(options_keys).length;
	test.expect(num_propt);
	

	if( options.length < config.length ){
		throw new Error('not all config options being used');
		test.done();
	}

	var idx = 0;
	for(var propt in options){
		test.deepEqual(groestlcoin.get(''+options_keys[idx]), options[''+propt]);
		idx ++;
	}
	
	test.done();
}
exports.set = function (test) {

	var new_options = {
      host: '133.7.7.7',
      port: 17777,
      user: 'new_1337_^*)()',
      pass: '*&@#cra$%zy@',
      passphrasecallback: function () { return 1+1;},
      https: false,
      ca: 'nothing here'
    };
	var options_keys = Object.keys(new_options);

	var num_propt = Object.keys(new_options).length;
	test.expect(num_propt);

	if( new_options.length < config.length ){
		throw new Error('not all config options being used');
		test.done();
	}

	var idx = 0;
	for(var propt in new_options){
		groestlcoin.set(''+options_keys[idx], new_options[ ''+options_keys[idx] ]);
		test.deepEqual(groestlcoin.get(''+options_keys[idx]), new_options[''+propt]);
		idx ++;
	}
	test.done();
}


// NOTE:
// 			All the code below has beencommented out as
// 			not sure if account name is the same as the user name or not

/*
/* BEFORE RUNNING read below:
 * Either run groestlcoind directly or run groestlcoin-qt with the -server
 * command line option. Make sure you have a ~/.groestlcoin/groestlcoin.conf
 * with rpcuser and rpcpassword config values filled out. Note that
 * newer versions of dogecoin (1.5 and above) don't allow identical
 * your rpc username and password to be identical.
 *
 */
/*
exports.commands_noAuth = {		
	//NOTE: Before running the getBalance add "gen=1" to the bottom of your groestlcoin.conf file
	getBalance: function(test){
		var curr_balance;
		groestlcoin.getBalance(function(err, balance) {
			test.ifError(err);
		  if (err) {
		    console.error('Failed to fetch balance', err.message);
		  }else {
		  	console.log('GRS balance is', balance);
			}
		  test.done();
		});
	},
	getBalance: function(test){

	},

	getGenerate: function(test){
		test.expect(2);
		groestlcoin.setGenerate(true,1);	
		test.equal(groestlcoin.getGenerate(), true);

		groestlcoin.setGenerate(false,1);	
		test.equal(groestlcoin.getGenerate(), false);
		test.done();
	},
	getreceived_: function(test){
		var amount= 0.0001;
		//dogecoin.setAccount()
		sendfrom("testnet_user", groestlcoin.getaccountaddress('testnet_user'),amount, function(err,addr){
			test.equal(getreceivedbyaccount('testnet_user', amount);
			test.equal( getreceivedbyaddress( groestlcoin.getaccountaddress('testnet_user') ), amount);
			test.done();

		});



	}

	
}

//all api commands that need .auth()
exports.commands_Auth = {		
	
	setUp: function () {
		groestlcoin.auth('testnet_user', 'testnet_pass');
	}

	
}
*/
