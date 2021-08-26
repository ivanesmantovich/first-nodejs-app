import http from 'http';

let server = http.createServer((request, response) => {
	console.log('Request made');
});

server.listen(3000, 'localhost', () => {
	console.log('Listening for requests on port 3000.');
});

