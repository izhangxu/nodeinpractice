var net = require('net');
var assert = require('assert');
var clients = 0;
var expectedAssertions = 2;

var server = net.createServer(function(client){
	clients++;
	var clientId = clients;
	console.log('Client connected:', clientId);

	client.on('end', function(){
		console.log('Client disconnected:', clientId);
	});

	client.write('Welcome client: ' + clientId + '\n');
	client.pipe(client);
	
});

server.listen(8000, function() {
	console.log('Server started on port 8000');

	runTest(1, function() {
		runTest(2, function(){
			console.log('Tests finished');
			assert.equal(0, expectedAssertions);
			server.close();
		});
	});

});

function runTest (num, cb) {
	var client = net.connect(8000);

	client.on('data', function(data){
		var str = 'Welcome client: ' + num + '\n';
		assert.equal(data.toString(), str);
		expectedAssertions--;
		client.end();
	});

	client.on('end', cb);
}