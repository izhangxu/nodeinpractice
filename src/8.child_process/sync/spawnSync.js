var spy = require('child_process').spawnSync;
var ps = spy('ps', ['aux']);
var grep= spy('grep', ['node'], {
	input: ps.stdin,
	encoding: 'utf8'
});

console.log(grep);