var Writable = require('stream').Writable;
var util = require('util');

module.exports = CountStream;

util.inherits(CountStream, Writable);

function CountStream(matchTxt, options) {
	Writable.call(this, options);
	this.count = 0;
	this.matcher = new RegExp(matchTxt, 'ig');
}

CountStream.prototype._write = function(chunk, encodeing, cb) {
	var matchs = chunk.toString().match(this.matcher);
	if (matchs) {
		this.count += matchs.length;
	}
	cb();
};

CountStream.prototype.end = function() {
	this.emit('total', this.count);
};