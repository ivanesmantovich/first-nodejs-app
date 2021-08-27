import http from 'http';
import fs from 'fs';

// Runs every time i connect to the site
let server = http.createServer((request, response) => {
	console.log(`Method: ${request.method}; URL: ${request.url}`);

	// RESPONSE: Header content type
	response.setHeader('Content-Type', 'text/html');

	// RESPONSE: Sending an HTML File
	let path = './views' + request.url + '.html';
	// RESPONSE: Redirecting
	if (request.url == '/about-me') {
		response.statusCode = 301;
		response.setHeader('Location', '/about');
		response.end();
	}
	fs.readFile(path, (error, data) => {
		if (error) {
			console.log(error);
			fs.readFile('./views/404.html', (error, data) => {
				if (error) {
					console.log(error);
					response.end();
				} else {
					response.statusCode = 404;
					response.end(data);
				}
			});
		} else {
			response.statusCode = 200;
			response.end(data);
		}
	});
});

server.listen(3000, 'localhost', () => {
	console.log('Listening for requests on port 3000.');
});
