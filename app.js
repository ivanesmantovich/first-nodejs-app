import express from 'express';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
const __dirname = path.resolve();
import { userName, password } from './secrets.js';
import newsRoutes from './routes/newsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';

// Set up an app
const app = express();

console.log('Web app is not up yet!');

// MONGODB CONNECTION
const dbURI =
	'mongodb+srv://' +
	userName +
	':' +
	password +
	'@firstmongo.8ft1f.mongodb.net/localNewsDB?retryWrites=true&w=majority';
mongoose
	.connect(dbURI)
	.then((result) => {
		console.log('Connected to the database. Web app is up.');
		// Listening for requests
		app.listen(3000); // Returns an instance of the server
	})
	.catch((error) => console.log(error));

// VIEW ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
// Using third-party solution
app.use(morgan('dev')); // Console logs info about requests
// !!! IMPORTANT !!! !!! IMPORTANT !!! !!! IMPORTANT !!! !!! IMPORTANT !!! !!! IMPORTANT !!!
app.use(express.urlencoded()); // Parses all incoming URL encoded data into a usable objects
// !!! IMPORTANT !!! !!! IMPORTANT !!! !!! IMPORTANT !!! !!! IMPORTANT !!! !!! IMPORTANT !!!

// STATIC FILES (IMAGES, CSS)
app.use(express.static('public'));

// MONGOOSE / MONGO ROUTES
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
app.use('/news', newsRoutes);

// CATEGORY ROUTES 
app.use('/categories', categoriesRoutes);

// app.get('/add-category', (request, response) => {
// 	let category = new Category({
// 		title: 'Economy',
// 	});

// 	category
// 		.save()
// 		.then((result) => {
// 			console.log('Category was added to the database.');
// 			response.redirect('/news');
// 		})
// 		.catch((error) => console.log(error));
// });

// If code comes to this point
// 404
app.use((request, response) => {
	response.render('404', { title: '404' });
});
