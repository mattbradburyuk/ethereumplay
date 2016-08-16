
const Web3 = require('web3');
const web3 = new Web3();
var jayson = require('jayson');
var BigNumber = require('bignumber.js');
var Promise = require('bluebird');

// *********** set up web3 and rpc ****************

var url = 'http://192.168.99.100:8541';
// console.log('web3 connect to:',url);
web3.setProvider(new web3.providers.HttpProvider(url));
// console.log('rpc connect to:',url);
var rpc_client = jayson.client.http(url);

// check connection objects
// console.log(web3._requestManager.provider.host);
// console.log(rpc_client.options.host)

var switch_on_mining;

var wallet_1 = "0x1F931a927A418a6D2b66f84057Afe0101716347E";
var wallet_2 = "0xfaF24B5Df147e4c83B59b91e08E8effbC680019E";
var wallet_3 = "0x3c220F2e8F23e9389E473C3b7E7CF97862df64F8";


// ********** execute Promise chain ***************

toggle_mining_on()
    .then(unlock_acc)
    .then(check_coinbase_funded)
    .then(send_tx_group)
    .then(toggle_mining_off)
    .then(end_success,end_error);


// ********** define promises ******************

function check_coinbase_funded(){
    console.log("check_coinbase_funded called")
    return new Promise(function(resolve,reject){
        
        var checker = setInterval(check, 2000);
        var min_fund_ether = 40;
        var min_fund_wei  = new BigNumber(web3.toWei(min_fund_ether, 'ether'))      //remember web3 numbers are always 'BigNumber' so have to use bignumber operators
        // console.log("min_fund_wei: ", min_fund_wei);
        
        
        function check(){
            console.log(" ---> checking coinbase has enough funds");
            web3.eth.getBalance(web3.eth.coinbase, callback)
        }
        function callback(e,result){

            // console.log(" min  : ", min_fund_wei.toNumber());
            // console.log(" funds: ", result.toNumber());
            
            var funded = result.comparedTo(min_fund_wei);
            // console.log("cmp: ",  funded);
            
            if (e){
                console.log("error");
                reject(e);
            }else if(funded >0 ) {
                clearInterval(checker);
                console.log(" ---> coinbase has sufficient funds\n");
                resolve(result);
            }
        }
    });
}

function unlock_acc(pass_through){
    console.log("unlock_acc called");
    return new Promise(function (resolve,reject){

        web3.personal.unlockAccount(web3.eth.accounts[0],'mattspass', callback);  // unlock accounts

        function callback(e,r) {
            if (e) {
                reject("unlock_acc error");
            } else {
                console.log(" --->account unlocked\n");
                resolve(pass_through);
            }
        }
    });
}




// ********* send_and_check_mined (sub promises) *********

function send_tx_group(){
    
    var p1 = send_tx_and_check_mined({from:web3.eth.coinbase, to: wallet_1, value: web3.toWei(10,'ether')});
    var p2 = send_tx_and_check_mined({from:web3.eth.coinbase, to: wallet_2, value: web3.toWei(10,'ether')});
    var p3 = send_tx_and_check_mined({from:web3.eth.coinbase, to: wallet_3, value: web3.toWei(10,'ether')});

    var proms = [p1,p2,p3];
    
    return Promise.all(proms);
}




function send_tx_and_check_mined(data) {
    console.log("send_tx_and_check_mined called");
    
    return new Promise(function (resolve,reject) {

        send_tx(data)
            .then(check_mined)
            .then(resolve, reject);
        
    });

}

function send_tx(data){
    console.log("send_tx fired");
    return new Promise(function (resolve,reject){

        web3.eth.sendTransaction(data, callback)

        function callback(e,tx_hash){
            console.log("callback fired, tx_hash:", tx_hash );
            if(e){
                console.log("e: ",e)
                reject(e)
            }else {
                resolve(tx_hash);
            }
        }
    });
}

function check_mined(tx_hash){
    return new Promise(function(resolve,reject){


        var check_timer = setInterval(check,2000);

        function check() {
            web3.eth.getTransactionReceipt(tx_hash, callback);
        }

        function callback(e,r){
            if (e){
                reject(e)
            }else{
                if(r == null){
                    // console.log("not mined yet")
                    }else{
                    // console.log("r: ", r)
                    console.log(" ---> tx mined")
                    clearInterval(check_timer);
                    resolve('mined')
                }
            }
        }
    })
}


// ********* toggling mining **********

function toggle_mining_on(pass_through){
    console.log("toggle_mining_on called");
    return new Promise(function (resolve, reject){

        if (web3.eth.mining) {
            console.log(" ---> Already mining\n")
            switch_on_mining = false;
            resolve(pass_through);
        }else{
            switch_on_mining = true
            rpc_client.request('miner_start', [], callback);
        }

        function callback(e,r) {
            if (e) {
                reject("toggle_mining_on error");
            } else {
                console.log(" ---> mining switched on\n")
                resolve(pass_through);
            }
        }
    });
}

function toggle_mining_off(pass_through){
    console.log("toggle_mining_off called");
    return new Promise(function (resolve, reject){

        if(switch_on_mining){

            rpc_client.request('miner_stop', [], callback);
        }else{
            console.log(" --> leave mining as was\n");
            resolve(pass_through);
        }

        function callback(e,r) {
            if (e) {
                reject("toggle_mining_on error");
            } else {
                console.log(" ---> Switching off mining\n")
                resolve(pass_through);
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


