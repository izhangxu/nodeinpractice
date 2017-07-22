var stream = require('stream');
var util = require('util');
var fs = require('fs');

function JSONLineReader(source) {
	stream.Readable.call(this);
	this._source = source;
	this._buffer = '';

	source.on('readable', function() {
		// console.log('source: \n' + source.read());
		this.read();
	}.bind(this));
}

util.inherits(JSONLineReader, stream.Readable);

JSONLineReader.prototype._read = function(size) {
	var chunk;
	var line;
	var lineIndex;
	var result;

	if (this._buffer.length === 0) {
		chunk = this._source.read();
		// console.log('chunk:' ,chunk)
		this._buffer += chunk;
	}

	lineIndex = this._buffer.indexOf('\n');

	if (lineIndex >= 0) {
		line = this._buffer.slice(0, lineIndex);
		if (line) {
			result = JSON.parse(line);
			// console.log(result);
			this._buffer = this._buffer.slice(lineIndex + 1);
			this.emit('object', result);
			this.push(util.inspect(result));
		} else {
			this._buffer = this._buffer.slice(1);
		}
	}
};

var input = fs.createReadStream(__dirname + '/json-lines.txt', {
	encoding: 'utf8'
});

var jsonLineReader = new JSONLineReader(input);

jsonLineReader.on('object', function(data) {
	console.log('pos:', data.position, '- letter:', data.letter);
});