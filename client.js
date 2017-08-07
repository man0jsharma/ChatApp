var io = require('./node_modules/socket.io-client');
var readline = require('readline');


var client = io('http://localhost:8080');

var rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.on('line', function(input){
    client.emit('message-from-client', input);
})


client.on('message-from-server', function(event){
    console.log(event.msg);
})

