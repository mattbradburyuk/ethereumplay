console.log("this is the tx_firer")

var jayson = require('jayson');
var client1 = jayson.client.http('http://192.168.99.100:8545');

client1.request('eth_coinbase',[],logResponse)

function logResponse(err, response){
    if(err){
        console.log(err)
    } else {
        console.log(response)
    }
}


// const commandLineArgs = require('command-line-args');
//
// const optionDefinitions = [
//     {name: 'ip', alias: 'i', type: String},
//     {name: 'port', alias: 'p', type: Number}];
//
// var cli = commandLineArgs(optionDefinitions);
//
// var opts = cli.parse();
//
// console.log(opts.ip);
//
//
// var http;
// http = require('http');
//
// var options = {
//     // host: '192.168.99.100' ,
//     // port: '8545',
//     host: opts.ip,
//     port: opts.port,
//     path: '/'};
//
// var callback = function(response) {
//     var str = '';
//     response.on('data', function(chunk){
//         str += chunk;
//     });
//
//     response.on('end', function(){
//         console.log(str);
//     });
//
// };
//
//
// console.log('call server: ');
// setTimeout(function(){
//     http.request(options, callback).end();
// }, 1000);
//
