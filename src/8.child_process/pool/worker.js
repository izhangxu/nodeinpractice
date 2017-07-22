process.on('message', function(job) {
	for(var i = 0; i< 1000000000; i++) {
		
	}
	process.send('finished: '  + i + job);
});