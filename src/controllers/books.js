import { getAllBooks, getBookById } from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('Failed to fetch books:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    const requestId = req.params.id;

    try {
        const book = await getBookById(requestId);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const createBookHandler = async (req, res) => {
    const { id, authorId, title, publicationDate } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!id) missingFields.push('id');
    if (!authorId) missingFields.push('authorId');
    if (!title) missingFields.push('title');
    if (!publicationDate) missingFields.push('publicationDate');

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required field(s): ${missingFields.join(', ')}`
        });
    }

    try {
        // Reject if authorId doesn't match an existing author
        const validAuthor = await authorExists(authorId);
        if (!validAuthor) {
            return res.status(400).json({
                message: `Author with id "${authorId}" does not exist`
            });
        }

        const result = await createBook({ id, authorId, title, publicationDate });
        return res.status(201).json(result);
    } catch (error) {
        console.error('POST /books failed:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const updateBookHandler = async (req, res) => {
    const requestId = req.params.id;
    const { authorId, title, publicationDate } = req.body;

    // Validate required fields (id is not re-validated on update — it's the URL param)
    const missingFields = [];
    if (!authorId) missingFields.push('authorId');
    if (!title) missingFields.push('title');
    if (!publicationDate) missingFields.push('publicationDate');

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required field(s): ${missingFields.join(', ')}`
        });
    }

    try {
        // Make sure the book exists first
        const existingBook = await getBookById(requestId);
        if (!existingBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        // Reject if authorId doesn't match an existing author
        const validAuthor = await authorExists(authorId);
        if (!validAuthor) {
            return res.status(400).json({
                message: `Author with id "${authorId}" does not exist`
            });
        }

        const result = await updateBook(requestId, { authorId, title, publicationDate });
        return res.status(200).json(result);
    } catch (error) {
        console.error('PUT /books/:id failed:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};


const deleteBookHandler = async (req, res) => {
    const requestId = req.params.id;

    try {
        const existingBook = await getBookById(requestId);
        if (!existingBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        await deleteBook(requestId);
        return res.status(200).json({
            message: 'Book deleted successfully'
        });
    } catch (error) {
        console.error('DELETE /books/:id failed:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };
