
// checks the ether balance on each of the geth main accounts (accounts[0], assumed to be coinbase)

const Web3 = require('web3');
const web3geth1 = new Web3();
const web3geth2 = new Web3();

setProvider(web3geth1, '192.168.99.100', 8541);
setProvider(web3geth2, '192.168.99.100', 8542);

function setProvider(web3, gethHost, gethPort) {
    var url = 'http://'+gethHost+':'+gethPort;
    console.log('web3 connect to:',url);
    web3.setProvider(new web3.providers.HttpProvider(url));
}


var addr1 = web3geth1.eth.accounts[0];
var addr2 = web3geth2.eth.accounts[0];

// console.log(web3geth1.personal.unlockAccount(addr1,'mattspass'));

logBals();


function logBals(){

    var bal1 = web3geth1.eth.getBalance(addr1);
    var bal2 = web3geth2.eth.getBalance(addr2);

    console.log('geth_1 address[0]: ', addr1, ' balance: ', JSON.stringify(bal1));
    console.log('geth_2 address[0]: ', addr2, ' balance: ', JSON.stringify(bal2));


}