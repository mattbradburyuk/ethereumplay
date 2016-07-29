// web3_poke.js

// uses web3 interface to get the timing and difficulty from all blocks
// (synchronous and very slow)

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

var bn = web3geth1.eth.blockNumber

var i

for (i = 0; i <bn; i++) {

    var t0 = web3geth1.eth.getBlock(i).timestamp;
    var t1 = web3geth1.eth.getBlock(i +1).timestamp;
    var difficulty = web3geth1.eth.getBlock(i).difficulty;
    var miner = web3geth1.eth.getBlock(i).miner;

    console.log("block: ",i, "difficulty: ", difficulty, " Time: ", t0, " dif to last: ", t1 - t0, " mined by: ", miner);
}


