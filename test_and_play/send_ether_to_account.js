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

var addr_1 = web3geth1.eth.coinbase;
var addr_2 = "0x1F931a927A418a6D2b66f84057Afe0101716347E";

web3geth1.personal.unlockAccount(addr_1, "mattspass");

web3geth1.eth.sendTransaction({from:addr_1, to: addr_2, value: 100000000000000000 });


