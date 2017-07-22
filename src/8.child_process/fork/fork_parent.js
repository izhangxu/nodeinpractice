var cp = require('child_process');
var child = cp.fork('./fork_child');

child.on('message', function(msg){
	console.log('got a message from child: ' + msg);
	child.disconnect();
});

child.send('sending a string');
