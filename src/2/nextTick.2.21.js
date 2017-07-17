var util = require('util');
var EventEmitter = require('events').EventEmitter;

function complexOperations() {
	var events = new EventEmitter();

	// events.emit('success', '123');
	process.nextTick(function() {
		events.emit('success', '123');
	});

	return events;
}

util.inherits(complexOperations, EventEmitter);

complexOperations().on('success', function(data) {
	console.log('success: ', data);
});