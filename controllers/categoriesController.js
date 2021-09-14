import Categories from '../models/category.js';
const categories_index = (request, response) => {
	Categories.find()
		.then((result) => {
			response.render('categories/index', { title: 'Categories', categories: result });
		})
		.catch((error) => console.log(error));
};

export { categories_index };
