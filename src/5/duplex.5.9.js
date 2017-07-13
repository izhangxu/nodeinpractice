// 使用双工流转换和接收数据

var stream = require('stream');

HungryStream.prototype = Object.create(stream.Duplex.prototype, {
	constructor: {
		value: HungryStream
	}
});

function HungryStream (options) {
	stream.Duplex.call(this, options);
	this.waiting = false;
}

HungryStream.prototype._write = function(chunk, encodeing, callback){
	this.waiting = true;
	this.push('\u001b[32m' + chunk + '\u001b[39m');
	callback();
};

HungryStream.prototype._read = function(size) {
	if (!this.waiting) {
		this.push('Feed me data! > ');
		this.waiting = true;
	}
};

var hungryStream = new HungryStream();

var p1 = process.stdin.pipe(hungryStream);
p1.pipe(process.stdout);


