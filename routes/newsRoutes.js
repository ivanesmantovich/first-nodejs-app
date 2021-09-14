import express from 'express';
import * as newsController from '../controllers/newsController.js';
const router = express.Router();

router.get('/', newsController.news_index);

router.get('/create', newsController.news_create_get);

router.post('/', newsController.news_create_post);

router.get('/:id', newsController.news_details);

router.delete('/:id', newsController.news_delete);

export default router;
