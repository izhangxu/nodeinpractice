var CountStream = require('./countstream');
var countstream = new CountStream('楼盘');
var http = require('http');

http.get('http://www.leju.com', function(res) {
	res.pipe(countstream);
});

countstream.on('total', function(data){
	console.log('Total matches:' + data);
});