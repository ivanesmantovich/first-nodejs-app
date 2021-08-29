import express from 'express';
import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();

// Set up an app
const app = express();

// VIEW ENGINE
app.set('view engine', 'ejs');

// Listening for requests
app.listen(3000); // Returns an instance of the server

app.get('/index', (request, response) => {
	let news = [
		{ title: 'CLB Release Date', snippet: 'September 5' },
		{ title: 'DONDA Release Date', snippet: 'SIKE' },
		{ title: 'How to clear your mind', snippet: 'Meditate or something...' },
	];
	response.render('index', { title: 'Home', news });
});

app.get('/about', (request, response) => {
	response.render('about', { title: 'About' });
});

app.get('/faq', (request, response) => {
	response.render('faq', { title: 'FAQ' });
});

app.get('/news/create', (request, response) => {
	response.render('create', { title: 'Create Page' });
});

// If code comes to this point
// 404
app.use((request, response) => {
	response.render('404', { title: '404' });
});
