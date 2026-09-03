import express from 'express';
const router = express.Router();

import { getBooksHandler } from './controllers/books.js';

router.get('/books', getBooksHandler);

export default router;