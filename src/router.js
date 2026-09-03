import express from 'express';
const router = express.Router();

import { getBooksHandler, getBookByIdHandler} from './controllers/books.js';

router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);

router.get('/books', getBooksHandler);

export default router;