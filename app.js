import express from 'express';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import mongoose from 'mongoose';
const __dirname = path.resolve();
//Importing my News model
import News from './models/news.js';

// Set up an app
const app = express();

// MONGODB CONNECTION
const dbURI =
	'mongodb+srv://readerWriter:FrozenBase67@firstmongo.8ft1f.mongodb.net/localNewsDB?retryWrites=true&w=majority';
mongoose
	.connect(dbURI)
	.then((result) => {
		console.log('Connected to the database.');
		// Listening for requests
		app.listen(3000); // Returns an instance of the server
	})
	.catch((err) => console.log(err));

// VIEW ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
// app.use((request, response, next) => {
// 	console.log('New request came in.');
// 	console.log('Host: ', request.hostname);
// 	console.log('Path:', request.path);
// 	console.log('Method:', request.method);
// 	next();
// });
// OR
// Using third-party solution
app.use(morgan('dev')); // Console logs info about requests

// STATIC FILES (IMAGES, CSS)
app.use(express.static('public'));

// MONGOOSE / MONGO SANDBOX ROUTES

// // Add a new document to the news collection
// app.get('/add-news', (request, response) => {
// 	// Creating an instance of a news structure-wise according to my model
// 	const news = new News({
// 		title: 'Second news of the week',
// 		snippet: 'New Kanye album is straight fire',
// 		body: 'All tracks actually sound different, WOW, 9/10'
// 	});

// 	news.save()
// 		.then((result) => {
// 			response.send(result)
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
// })

// // Get all documents in the news collection
// app.get('/all-news', (request, response) => {
// 	News.find()
// 		.then((result) => {
// 			response.send(result);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		})
// })

// // Get one specified document
// app.get('/donda-review', (request, response) => {
// 	News.findById("6137c5b650247caa1ccac924")
// 		.then((result) => {
// 			response.send(result)
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
// })

// Routing
// BASIC ROUTES
app.get('/', (request, response) => {
	response.redirect('/news');
});

app.get('/about', (request, response) => {
	response.render('about', { title: 'About' });
});

app.get('/faq', (request, response) => {
	response.render('faq', { title: 'FAQ' });
});

// NEWS ROUTES

app.get('/news', (request, response) => {
	// Get all news instances
	// News.find()
	// OR
	// I can sort the news i get by certain parameter 
	News.find().sort({createdAt: -1})
		.then((result) => {
			response.render('index', { title: 'All news', news: result });
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get('/news/create', (request, response) => {
	response.render('create', { title: 'Create Page' });
});

// If code comes to this point
// 404
app.use((request, response) => {
	response.render('404', { title: '404' });
});
