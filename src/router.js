import express from 'express';
const router = express.Router();

import { getBooksHandler, getBookByIdHandler} from './controllers/books.js';

router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);


export default router;
