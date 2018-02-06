/**
// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
*/

var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http, {pingTimeout: 30000});
	let clientList = [];
	//on connection event
	io.on('connection', function(socket){
		clientList.push(socket.id)
		console.log(clientList);
		/*
			This method used to register expicitly
			socket.on('registerToken', function(data){
			})
		*/
		socket.on('sendMessage', function(messageBody){
			//send to individual socket id or private message 
			//io.to(socketid).emit('onReceive', data);
			console.log(messageBody);
			data = messageBody;
			//broadcast including client 
			//io.emit('onReceive', data);
			socket.broadcast.emit('onReceive', data);
		});
	socket.on('disconnect', function(){
		  console.log('Disconnected : '+socket.id);
		  clientList.splice(clientList.indexOf(socket.id, 1))
	})
});

//Port can be change from here
http.listen(3000, function(){
  console.log('listening on *:3000');
});
