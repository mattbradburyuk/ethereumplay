
const commandLineArgs = require('command-line-args');

var cli = commandLineArgs([
    {name: 'command', alias: 'c', type: String, defaultValue: 'default', description: 'the command'}
]);

var options = cli.parse();

console.log('starting with options:',JSON.stringify(options));

const Web3 = require('web3');
const web3geth1 = new Web3();
const web3geth2 = new Web3();

setProvider(web3geth1, '192.168.99.100', 8545);
setProvider(web3geth2, '192.168.99.100', 8546);

createAndUnlockAccount(web3geth1);
createAndUnlockAccount(web3geth2);

function setProvider(web3, gethHost, gethPort) {
    var url = 'http://'+gethHost+':'+gethPort;
    console.log('web3 connect to:',url);
    web3.setProvider(new web3.providers.HttpProvider(url));
}

function createAndUnlockAccount(web3) {
    console.log('creating account with password', 'mattspass');
    var address = web3.personal.newAccount('mattspass');
    console.log('Address: ',address);
}



// var jayson = require('jayson');
// var client1 = jayson.client.http('http://192.168.99.100:8545');
//
// client1.request('eth_coinbase',[],logResponse)
//
// function logResponse(err, response){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(response)
//     }
// }
//
// const Web3 = require('web3');
//
// const geth_1 = new Web3;
//
// // var prov = geth_1.providers.HttpProvider('http://192.168.99.100:8545');
//
// geth_1.setProvider(new geth_1.providers.HttpProvider('http://192.168.99.100:8545'))
//
//
// console.log('api version: ' + geth_1.version.api)
// console.log('currentProvider: ' + geth_1.currentProvider)
// console.log('isConnected(): ' + geth_1.isConnected())
//
// createAndUnlockAccount(geth_1)
//
// function createAndUnlockAccount(web3) {
//     console.log('creating account with password', 'mattspass');
//     var address = web3.personal.newAccount('mattspass');
//     console.log('Account address: ', address);
// }
//
//
// console.log(geth_1.eth.accounts);


// setProvider(geth_1,'192.168.99.100',8545)
//
// // console.log(geth_1);
//
//
// // geth_1.eth.coinbase
//
//
// function setProvider(web3, gethHost, gethPort) {
//     var url = 'http://'+gethHost+':'+gethPort;
//     console.log('web3 connect to:',url);
//     web3.setProvider(new web3.providers.HttpProvider(url));
// }