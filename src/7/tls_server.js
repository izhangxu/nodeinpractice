var tls = require('tls');
var fs = require('fs');

var options = {
	key: fs.readFileSync('./keys/server.key'),
	cert: fs.readFileSync('./keys/server.crt'),
	requestCert: true,
	ca: [fs.readFileSync('./keys/ca.crt')]
};

var server = tls.createServer(options, function(socket){
	console.log(socket.authorized);
	console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');
	socket.write('welcome\n');
	socket.setEncoding('utf8');
	socket.pipe(socket);
});
server.listen(8000, function(){
	console.log('server bound');
});