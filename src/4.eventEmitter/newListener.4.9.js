var util = require('util');
var events = require('events');

function EventTracker() {
	events.EventEmitter.call(this);
}

util.inherits(EventTracker, events.EventEmitter);

var eventTracker = new EventTracker();

// 一旦有监听器加入进来就开始追踪
eventTracker.on('newListener', function(name, listener) {
	console.log('name: ' + name);
	console.log('listener: ' + listener);
});

eventTracker.on('a listener', function() {
	// this will cause 'newListener' to fire
});