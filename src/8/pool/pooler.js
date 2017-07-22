var cp = require('child_process');
var cpus = require('os').cpus().length;

module.exports = function(workModule) {
	var awaiting = [];
	var readyPool = [];
	var poolSize = 0;

	return function doWork(job, cb) {
		if (!readyPool.length && poolSize > cpus) {
			return awaiting.push([doWork, job, cb]);
		}

		var child = readyPool.length ? readyPool.shift() : (poolSize++, cp.fork(workModule));
		var cbTriggered = false;

		child
			.removeAllListeners()
			.once('error', function(err) {
				if (!cbTriggered) {
					cb(err);
					cbTriggered = true;
				}
				child.kill();
			})
			.once('exit', function(code) {
				if (!cbTriggered) {
					cb(new Error('child exited with code: ' + code));
				}
				poolSize--;
				var childIdx = readyPool.indexOf(child);
				if (childIdx > -1) {
					readyPool.splice(childIdx);
				}
			})
			.once('message', function(msg) {
				cb(null, msg);
				cbTriggered = true;
				readyPool.push(child);
				if (awaiting.length) {
					setImmediate.apply(null, awaiting.shift());
				}
			})
			.send(job);
	};
};