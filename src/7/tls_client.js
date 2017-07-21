var tls = require('tls');
var fs = require('fs');
var os = require('os');

var options = {
	key: fs.readFileSync('./keys/client.key'),
	cert: fs.readFileSync('./keys/client.crt'),
	ca: [fs.readFileSync('./keys/ca.crt')],
	servername: os.hostname()
};

var client = tls.connect(8000, options, function() {
	console.log('client connected', client.authorized ? 'authorized' : 'unauthorized');
	process.stdin.pipe(client);
});

client.setEncoding('utf8');
client.on('data', function(data){
	console.log(data);
});

client.on('end', function(){
	server.close();
});