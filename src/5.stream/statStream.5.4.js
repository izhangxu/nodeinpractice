var stream = require('stream');
var util = require('util');
var fs = require('fs');
var express = require('express');
var app = express();

util.inherits(StatStream, stream.Readable);

function StatStream(limit) {
	stream.Readable.call(this);
	this.limit = limit;
}
// 定制，重写readable的read方法。
StatStream.prototype._read = function(size) {
	if (this.limit === 0) {
		this.push(null);  // 传递一个信号停止写入队列
	} else {
		this.push(util.inspect(process.memoryUsage()));
		this.push('\n');
		this.limit--;
	}
};

app.get('/', function(req, res) {
	var statStream = new StatStream(10);
	// 流直接通过管道传递给res对象 
	// Express集成了一种方式让res.send方法使用流，并且对于流能使用pipe
	// 相当于 res.send(xxx); xxx是读取流的内容
	statStream.pipe(res); 
}).listen(3000);