var util = require('util');
var events = require('events');

function Pulsar(speed, times) {
	events.EventEmitter.call(this);
	this.speed = speed;
	this.times = times;
	this.timer = null;
	this.on('newListener', function(name) {
		console.log('newListener fire');
		if (name == 'pause') {
			this.start();
		}
	});
}

util.inherits(Pulsar, events.EventEmitter);

Pulsar.prototype.start = function() {
	var self = this;
	clearInterval(this.timer);
	self.timer = setInterval(function() {
		self.emit('pause');
		self.times--;
		if (self.times <= 0) {
			clearInterval(self.timer);
		}
	}, self.speed);
};

Pulsar.prototype.stop = function() {
	var self = this;
	if (self.listeners('pause').length === 0) {
		throw new Error('no listeners have been added');
	}
};

var pulsar = new Pulsar(500, 5);

pulsar.on('pause', function() {
	console.log('.');
});

// pulsar.stop();