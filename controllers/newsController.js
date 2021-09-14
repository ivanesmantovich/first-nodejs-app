import News from '../models/news.js';

const news_index = (request, response) => {
	News.find()
		.sort({ createdAt: -1 }) // By New
		.then((result) => {
			response.render('news/index', { title: 'All news', news: result });
		})
		.catch((error) => console.log(error));
};

const news_details = (request, response) => {
    const id = request.params.id;
	News.findById(id)
		.then((result) => {
			response.render('news/details', { news: result, title: 'News Details' });
		})
		.catch((error) => response.status(404).render('404', { title: '404' }));
}

const news_create_get = (request, response) => {
    response.render('news/create', { title: 'Create Page' });
}

const news_create_post = (request, response) => {
    let news = new News(request.body);

	news
		.save()
		.then((result) => {
			console.log('News has been added to the database.');
			response.redirect('/news');
		})
		.catch((error) => console.log(error));
}

const news_delete = (request, response) => {
    const id = request.params.id;

	News.findByIdAndDelete(id)
		.then((result) => {
			response.json({ redirect: '/news' });
		})
		.catch((error) => {
			console.log(error);
		});
}

export { news_index, news_details, news_create_get, news_create_post, news_delete};