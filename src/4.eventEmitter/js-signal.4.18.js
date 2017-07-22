var signals = require('signals');

var myObject = {
	start: new signals.Signal()
};

function onStart() {
	console.log(arguments);
}

myObject.start.add(onStart); // 订阅
myObject.start.dispatch('hello', 'world'); // 发布