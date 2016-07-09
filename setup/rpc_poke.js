/**
 * Created by matthewbradbury on 08/07/2016.
 */

var jayson = require('jayson');
var client1 = jayson.client.http('http://192.168.99.100:8541');
var client2 = jayson.client.http('http://192.168.99.100:8542');


client1.request('admin_nodeInfo', [], nodeInfoResponse);

// client1.request('miner_start', [1], logResponse);
// client1.request('miner_stop', [1], logResponse);



function nodeInfoResponse(err, response){
    console.log('nodeInfoResponse called');
    if (err) {
        console.log('err: ',JSON.stringify(err));
    } else {

        var id = response.result.id;
        var enode = 'enode://'+id+'@'+'172.21.0.2' + ':30303';
        // console.log(enode)

        client2.request('admin_addPeer', [enode],addPeerResponse)

    }
}

function addPeerResponse(err, response) {
    console.log('addPeerResponse called');
    if (err) {
        console.log('err: ', JSON.stringify(err));
    } else {
        console.log('response: ', response)
    }

    console.log('registered peer - checking');
    client2.request('admin_peers', null, function(err, response) {
        console.log('client2:'+JSON.stringify(response));
    });
    client1.request('admin_peers', null, function(err, response) {
        console.log('client1:'+JSON.stringify(response));
    });


}