var http =require('http');
var makePool = require('./pooler');
var work = makePool('./worker');

http.createServer(function(req, res) {
	work('some dummy job', function(err, msg) {
		if (err){
			return res.end('got an error: '+ err.message);
		}
		res.end(msg);
	});
}).listen(3000);