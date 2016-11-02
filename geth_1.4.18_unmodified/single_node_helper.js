
// called from setup_geth.sh


// Does the following:

// Set up jayson and web3 objects
// creates and unlocks account

// funds the account by mining until it has ether


// Set up jayson and web3 objects

var jayson = require('jayson');
var client1 = jayson.client.http('http://0.0.0.0:8541');

const Web3 = require('web3');
const web3geth1 = new Web3();


setProvider(web3geth1, '0.0.0.0', 8541);


function setProvider(web3, gethHost, gethPort) {
    var url = 'http://'+gethHost+':'+gethPort;
    console.log('web3 connect to:',url);
    web3.setProvider(new web3.providers.HttpProvider(url));
}

// Creates and unlocks accounts

createAccount(web3geth1);


web3geth1.personal.unlockAccount(web3geth1.eth.accounts[0],'mattspass');


function createAccount(web3) {
    console.log('creating account with password', 'mattspass');
    var address = web3.personal.newAccount('mattspass');
    console.log('Address: ',address);
}




// Fund accounts

startMining()
// client1.request('miner_start', [1], logResponse);


// mining functions

var balanceCheckerTimer;

function startMining() {
    console.log('starting node mining')
    client1.request('miner_start', [1], logResponse);
    balanceCheckerTimer = setInterval(checkBalancesNonZero, 2000); // repeats call back every 2000ms
}

function stopMining(){
    console.log('stopping node mining')
    client1.request('miner_stop', [1], logResponse);
}

function checkBalancesNonZero() {
    if (hasEther(web3geth1)) {
        console.log('balance non zero');
        console.log('stopping mining ...');
        setTimeout(stopMining, 5000);
        clearInterval(balanceCheckerTimer);
    } else {
        console.log('(still) waiting for account to have ether...');
    }
}


function hasEther(web3) {
    var balance = web3.eth.getBalance(web3.eth.coinbase);
    console.log(balance.toString());
    return balance.greaterThan(0)
}

// reusable response call back function

function logResponse(err, response){
    if (err) {
        console.log('err: ',JSON.stringify(err));
    } else {
        console.log('response: ',JSON.stringify(response));
    }
}