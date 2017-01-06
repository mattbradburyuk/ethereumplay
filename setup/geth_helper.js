
// called from setup_geth.sh


// Does the following:

// Set up jayson and web3 objects
// creates and unlocks accounts
// Join two nodes together
// funds the accoutns by mining until they both have ether




// Warning ------ massive hack ------
// joining two nodes together requires geth_1 to have ip 127.21.0.2,
// this is acheived by adding dependencies into the docker-compose.2nodes.yml
// this is very dodgy as can't guarantee that docker will assign this ip


// command line read in for future expansion (possibly making it take the ips/ports in)

const commandLineArgs = require('command-line-args');

var cli = commandLineArgs([
    {name: 'command', alias: 'c', type: String, defaultValue: 'default', description: 'the command'}
]);

var options = cli.parse();

console.log('starting with options:',JSON.stringify(options));

// Set up jayson and web3 objects

var jayson = require('jayson');
var client1 = jayson.client.http('http://0.0.0.0:8541');
var client2 = jayson.client.http('http://0.0.0.0:8542');

const Web3 = require('web3');
const web3geth1 = new Web3();
const web3geth2 = new Web3();

setProvider(web3geth1, '0.0.0.0', 8541);
setProvider(web3geth2, '0.0.0.0', 8542);

function setProvider(web3, gethHost, gethPort) {
    var url = 'http://'+gethHost+':'+gethPort;
    console.log('web3 connect to:',url);
    web3.setProvider(new web3.providers.HttpProvider(url));
}

// Creates and unlocks accounts

createAccount(web3geth1);
createAccount(web3geth2);

web3geth1.personal.unlockAccount(web3geth1.eth.accounts[0],'mattspass');
web3geth2.personal.unlockAccount(web3geth2.eth.accounts[0],'mattspass');


function createAccount(web3) {
    console.log('creating account with password', 'mattspass');
    var address = web3.personal.newAccount('mattspass');
    console.log('Address: ',address);
}


// Join two nodes together

joinHostsTogether()

function joinHostsTogether() {
    client1.request('admin_nodeInfo', [], nodeInfoResponse);
}

function nodeInfoResponse(err, response){
    if (err) {
        console.log('err: ',JSON.stringify(err));
    } else {
        console.log("admin_nodeInfo response: ", response);
        var id = response.result.id;
        var enode = 'enode://'+id+'@'+'172.18.0.2' + ':30303';
        // console.log(enode)
        console.log("Attaching geth_2 to geth_1");
        client2.request('admin_addPeer', [enode],addPeerResponse)

    }
}

function addPeerResponse(err, response) {
    if (err) {
        console.log('addPeerResponse err: ', JSON.stringify(err));
    } else {
        console.log('addPeerResponse response: ', JSON.stringify(response));
        setTimeout(checkPeers,10000);
    }
}

function checkPeers(){
    console.log('Registered peer - checking');
    client1.request('admin_peers', null, function (err, response) {
        console.log('client1:' + JSON.stringify(response));
    });
    client2.request('admin_peers', null, function (err, response) {
        console.log('client2:' + JSON.stringify(response));
    });
}



// Fund accounts

startBothMining()
// client1.request('miner_start', [1], logResponse);


// mining functions

var balanceCheckerTimer;

function startBothMining() {
    console.log('starting both nodes mining')
    client1.request('miner_start', [1], logResponse);
    client2.request('miner_start', [1], logResponse);
    balanceCheckerTimer = setInterval(checkBalancesNonZero, 2000); // repeats call back every 2000ms
}

function stopBothMining(){
    console.log('stopping both nodes mining')
    client1.request('miner_stop', [1], logResponse); // should this be []??? why does it still work??
    client2.request('miner_stop', [1], logResponse);

}

function checkBalancesNonZero() {
    if (hasEther(web3geth1) && hasEther(web3geth2)) {
        console.log('both balances now non-zero... stopping mining...');
        setTimeout(stopBothMining, 5000);
        clearInterval(balanceCheckerTimer);
    } else {
        console.log('waiting for accounts to have ether...');
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