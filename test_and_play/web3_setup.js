// web3_setup.js

// require the Web3 module
const Web3 = require('web3');

// set up the web3 object for communication with the geth instance (at 192.168.99.100:8541)
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers - set to docker container's external ip:port
    web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.99.100:8541"));
}

// Test you get a response when using the web3 object
var res = web3.eth.coinbase;
console.log(res);