
const commandLineArgs = require('command-line-args');

var cli = commandLineArgs([
    {name: 'command', alias: 'c', type: String, defaultValue: 'default', description: 'the command'}
]);

var options = cli.parse();

console.log('starting with options:',JSON.stringify(options));

// set up jayson and web3 objects

var jayson = require('jayson');
var client1 = jayson.client.http('http://192.168.99.100:8541');
var client2 = jayson.client.http('http://192.168.99.100:8542');

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

// create accounts

createAccount(web3geth1);
createAccount(web3geth2);

function createAccount(web3) {
    console.log('creating account with password', 'mattspass');
    var address = web3.personal.newAccount('mattspass');
    console.log('Address: ',address);
}


// =Join two nodes together
joinHostsTogether()

// ******************* need to work out how to join nodes together *******************
function joinHostsTogether() {
    client1.request('admin_nodeInfo', [], nodeInfoResponse);
}

function nodeInfoResponse(err, response){
    if (err) {
        console.log('err: ',JSON.stringify(err));
    } else {
        var id = response.result.id;
        var enode = 'enode://'+id+'@'+'172.21.0.2' + ':30303';
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
        setTimeout(checkPeers,1000);
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





// fund accounts

// startBothMining()
// client1.request('miner_start', [1], logResponse);


// mining functions

// var balanceCheckerTimer;
//
// function startBothMining() {
//     console.log('starting both nodes mining')
//     client1.request('miner_start', [1], logResponse);
//     client2.request('miner_start', [1], logResponse);
//     balanceCheckerTimer = setInterval(checkBalancesNonZero, 2000); // repeats call back every 2000ms
// }
//
// function stopBothMining(){
//     console.log('stopping both nodes mining')
//     client1.request('miner_stop', [1], logResponse);
//     client2.request('miner_stop', [1], logResponse);
//
// }
//
// function checkBalancesNonZero() {
//     if (hasEther(web3geth1) && hasEther(web3geth2)) {
//         console.log('oooh, both balances now non-zero...');
//         console.log('stopping ing mining in 5s so that it has some ether...');
//         setTimeout(stopBothMining, 5000);
//         clearInterval(balanceCheckerTimer);
//     } else {
//         console.log('(still) waiting for both accounts to have ether...');
//     }
// }
//
//
// function hasEther(web3) {
//     var balance = web3.eth.getBalance(web3.eth.coinbase);
//     console.log(balance.toString());
//     return balance.greaterThan(0)
// }

// reusable response call back function

function logResponse(err, response){
    if (err) {
        console.log('err: ',JSON.stringify(err));
    } else {
        console.log('response: ',JSON.stringify(response));
    }
}