console.log('tx_listener called')

var WebSocket = require('ws');

setTimeout(createWS, 5000);

// createWS()

function createWS() {
    console.log('createWS called');
    var ws = new WebSocket("ws://172.21.0.2:8546");


// var ws = new WebSocket("ws://192.168.99.100:8546/");


// console.log(ws);

    ws.on('error', function (error) {

        console.log('error: ', error);
    })


    ws.on('open', function open() {

        console.log('ws open');

        // ws.send('{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":1}');
    });

    ws.on('message', function (data, flags) {

        console.log('received data: ', data);
        console.log('received flags: ', flags);

    })
}