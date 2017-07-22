var express = require('express');
var app = express();

app.on('hello', function(){
	console.log('Hello....');
});

app.get('/', function(req, res) {
	// 使用拆分路由技术奖路由文件放在不同的文件中时，可以通过调用res.app.emit(eventName)来发布事件
	res.app.emit('hello'); 
	res.send('hello world');
});

app.listen(3000);