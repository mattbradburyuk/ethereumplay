const Promise = require("bluebird");
var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const web3 = new Web3();


setProvider(web3, '192.168.99.100', 8541);

function setProvider(web3, gethHost, gethPort) {
    var url = 'http://'+gethHost+':'+gethPort;
    console.log('web3 connect to:',url);
    web3.setProvider(new web3.providers.HttpProvider(url));
}

// *******  promise chain ************

fund_account()
    .then(sendCash)
    .then(end_success,end_error);




// ******** define promises **********

// fund_account();

function fund_account(){

    return new Promise(function(resolve, reject) {

        console.log("fund account");

        cb = web3.eth.accounts[0]
        console.log("coinbase: ", cb)
        web3.personal.unlockAccount(cb, "mattspass");


        var from_addr = '0x46f1ad5c40ff2a7de6c2c621d07334e6dab8b49d';

        var from_addr_bal = web3.eth.getBalance(from_addr, callback_1);

        function callback_1(err, result){
            if (err) {
                console.log('callback_1 err: ',JSON.stringify(err));
                reject(err);
            } else {
                var target_bal = result;
                console.log('from_addr_bal: ', web3.fromWei(target_bal, 'ether').toString());

                var min_funding = web3.toWei(10, 'ether');

                if (target_bal.cmp(min_funding) < 0) {
                    console.log("bal too low, transferring 10 ether from coinbase");
                    web3.eth.sendTransaction({from: cb, to: from_addr, value: web3.toWei(10, 'ether')}, callback_2);
                } else{
                    console.log("bal sufficient");
                    resolve()
                }

            }
        }

        function callback_2(err, result){
            if (err) {
                console.log('callback_2 err: ',JSON.stringify(err));
                reject(err);
            } else {
                console.log('callback_2 result: ',JSON.stringify(result));
                resolve(result)
            }
        }
    });
}



function sendCash() {

    return new Promise( function(resolve, reject){

        console.log('Send Cash called');

        var privateKey = new Buffer('2e0b19d769009181e9d42c1bec181fc809113bb0a8610ed770d29748ea14d7ac', 'hex')
        console.log("private key", privateKey);


        var tx_count = web3.eth.getTransactionCount("0x46f1ad5c40ff2a7de6c2c621d07334e6dab8b49d");
        console.log("tx_count: ", tx_count);

        var rawTx = {
            nonce: tx_count,
            gasPrice: '0x1210000000',
            gasLimit: '0x2710000',
            from: '0x46f1ad5c40ff2a7de6c2c621d07334e6dab8b49d',
            to: '0x316249bae00caca882d826ab2a61a4bc3082fcd2',
            //gas: '121000',
            value: '0x10000000000000000'
            // value: web3.toWei(5,'ether').toString(),
            //data: '0x00'
        };

        var tx = new Tx(rawTx);
        console.log('TX: ', tx);

        tx.sign(privateKey);

        var serializedTx = tx.serialize();
        console.log("serialised", serializedTx);

        web3.eth.sendRawTransaction(serializedTx.toString('hex'), callback);

        function callback(err, hash) {
            if (!err) {
                console.log(hash);
                resolve(hash);

            } else {
                console.log('Error', err);
                reject(err);
            }
        }
    });
}



// *********end of promise chain markers **********

function end_success(result) {
    console.log("End result: ---> ",result); // "Stuff worked!"
}
function end_error(err) {
    console.log("End error: ---> ",err); // Error: "It broke"
}










// sendCash()

// function sendCash() {
//     console.log('here4');
//     var privateKey = new Buffer('2e0b19d769009181e9d42c1bec181fc809113bb0a8610ed770d29748ea14d7ac', 'hex')
//     // var rawTx = {
//     //     nonce: '0x00',
//     //     gasPrice: '20000000000',
//     //     gasLimit: '0x2710000',
//     //     from: '0x46f1ad5c40ff2a7de6c2c621d07334e6dab8b49d',
//     //     to: '0x316249bae00caca882d826ab2a61a4bc3082fcd2',
//     //     gas: '121000',
//     //     value: '0x00'
//     //     //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
//     // }
//
//     // var rawTx = {
//     //     nonce: 0,
//     //     gasPrice: '0x1210000',
//     //     gasLimit: '0x27100000',
//     //     from: '0x46f1ad5c40ff2a7de6c2c621d07334e6dab8b49d',
//     //     to: '0x316249bae00caca882d826ab2a61a4bc3082fcd2',
//     //     //gas: '121000',
//     //     value: '0x001',
//     //     data: '0x001'
//     // }
//
//     var rawTx = {
//         nonce: '0x01',
//         gasPrice: '0x1210000000',
//         gasLimit: '0x2710000',
//         from: '0x46f1ad5c40ff2a7de6c2c621d07334e6dab8b49d',
//         to: '0x316249bae00caca882d826ab2a61a4bc3082fcd2',
//         //gas: '121000',
//         value: '0x100000000000'
//         //data: '0x00'
//     }
//
//
//     console.log("private key", privateKey);
//     var tx = new Tx(rawTx);
//     console.log('Raw TX: ', rawTx);
//     console.log('TX: ', tx);
//     tx.sign(privateKey);
//     var serializedTx = tx.serialize();
//
//     console.log("serialised", serializedTx);
//
//     console.log("Data: ", tx.data)
//
//     web3.eth.sendRawTransaction(serializedTx.toString('hex'), function(err, hash) {
//         if (!err) {
//             console.log(hash);
//         } else {
//             console.log('Error', err);
//         }
//     });
// }