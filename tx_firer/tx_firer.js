
// send a tx from geth_1 to geth_2 via web3 api


console.log("**************tx_firer launched *******************");


const Web3 = require('web3');
const web3geth1 = new Web3();
const web3geth2 = new Web3();

// setProvider(web3geth1, '172.21.0.2', 8545); // need to get these to pick up automatically as they are not always the same
// setProvider(web3geth2, '172.21.0.3', 8545);

setProvider(web3geth1, '192.168.99.100', 8541);
setProvider(web3geth2, '192.168.99.100', 8542);


function setProvider(web3, gethHost, gethPort) {
    var url = 'http://'+gethHost+':'+gethPort;
    console.log('web3 connect to:',url);
    web3.setProvider(new web3.providers.HttpProvider(url));
}

// sendTx();


var http = require("http");

http.createServer(function (request, response) {

    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    var resp = sendTx();
    response.end('tx sent: '+ resp);

}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');



function sendTx(){
    var addr1 = web3geth1.eth.accounts[0];
    var addr2 = web3geth2.eth.accounts[0];

    web3geth1.personal.unlockAccount(addr1,'mattspass');
    web3geth2.personal.unlockAccount(addr2,'mattspass');

    var resp = web3geth1.eth.sendTransaction({from:addr1, to: addr2, value: 1001});
    console.log('tx receipt: ', resp);
    return resp;
}

