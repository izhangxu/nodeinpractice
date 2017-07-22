const RandomNumberStream = require('./RandomNumberStream');
const rns = new RandomNumberStream(5);
rns.on('readable', () => {
	let chunk;
	while ((chunk = rns.read()) !== null) {
		console.log(chunk.toString())
	}
});