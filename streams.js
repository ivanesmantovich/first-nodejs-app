import fs, { write } from 'fs';

let readStream = fs.createReadStream('./files/lorem.txt', {
	encoding: 'utf-8',
});

let writeStream = fs.createWriteStream('./files/dataPool.txt');

// readStream.on('data', (buffer) => {
// 	console.log('----------- BUFFER IS FILLED -----------');
// 	console.log(buffer);
// 	writeStream.write('\n BUFFER IS FILLED \n');
// 	writeStream.write(buffer);
// });

// OR (Same thing)
// Piping

readStream.pipe(writeStream);

