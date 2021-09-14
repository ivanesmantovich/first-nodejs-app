import express from 'express';
import * as categoriesController from '../controllers/categoriesController.js';
const router = express.Router();

router.get('/', categoriesController.categories_index);

export default router;
