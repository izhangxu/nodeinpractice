var fs = require('fs');
fs.readFile('./names.txt', function(err, buf) {
	// console.log(buf.toString());
	console.log(buf.toString('base64'));
});