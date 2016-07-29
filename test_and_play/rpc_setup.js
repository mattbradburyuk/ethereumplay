// rpc_setup.js

// require jayson module
var jayson = require('jayson');

// set up a client1 object for making json requests over http
var client1 = jayson.client.http('http://192.168.99.100:8541');

// test it works by calling eth_coinbase,  note asynchronous function call, requires a call back
var req1 = client1.request('eth_coinbase', [], logResponse);

// call back
function logResponse(err, response){
    if (err) {
        console.log('err: ',JSON.stringify(err));
    } else {
        console.log('response: ',JSON.stringify(response));
    }
}