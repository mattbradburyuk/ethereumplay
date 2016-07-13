/**
 * Created by matthewbradbury on 08/07/2016.
 */

var jayson = require('jayson');
var client1 = jayson.client.http('http://192.168.99.100:8541');
var client2 = jayson.client.http('http://192.168.99.100:8542');


console.log('Starting mining');

var req1 = client1.request('miner_start', [1], logResponse);
var req2 = client2.request('miner_start', [1], logResponse);

console.log('miner_start request geth_1: ',req1.id);
console.log('miner_start request geth_2: ',req2.id);


// reusable response call back function

function logResponse(err, response){
    if (err) {
        console.log('err: ',JSON.stringify(err));
    } else {
        console.log('response: ',JSON.stringify(response));
    }
}