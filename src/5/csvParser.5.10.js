var fs = require('fs');
var stream = require('stream');

CsvParser.prototype = Object.create(stream.Transform.prototype, {
	constructor: {
		value: CsvParser
	}
});

function CsvParser(options) {
	stream.Transform.call(this, options);
	this.line = 0;
	this.value = '';
	this.values = [];
	this.headers = [];
}

CsvParser.prototype._transform = function(chunk, encoding, callback) {
	var c;
	var i;

	chunk = chunk.toString();
	for (i = 0; i < chunk.length; i++) {
		c = chunk.charAt(i);

		if (c === ',') {
			this.addValue();
		} else {
			if (c === '\n') {
				this.addValue();
				if (this.line > 0) {
					this.push(JSON.stringify(this.toObject()));
				}
				this.values = [];
				this.line++;
			} else {
				this.value += c;
			}
		}
	}
	callback();
};

CsvParser.prototype.addValue = function() {
	if (this.line === 0) {
		this.headers.push(this.value);
	} else {
		this.values.push(this.value);
	}
	this.value = '';
};

CsvParser.prototype.toObject = function() {
	var i = 0;
	var obj = {};
	for (i = 0; i < this.headers.length; i++) {
		obj[this.headers[i]] = this.values[i];
	}
	return obj;
};

var parser = new CsvParser();
fs.createReadStream(__dirname + '/csv-test.csv').pipe(parser).pipe(process.stdout);