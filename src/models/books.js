import  { getDb }   from '../db/connect.js';

const getAllBooks = async() => {
    const db = getDb();
    const books = await db.collection('books').find({}).toArray();
    return books;
};


const getBookById = async (bookId) => {
     const db = getDb();
     const collection = db.collection('books');
     const book = await collection.findOne({ id: bookId });
     return book;
};

const authorExits = async(authorId) => {
    const db = getDb();
    const author = await db.collection('authors').findOne({id: authorId});
    return author !== null;
};

const createBook = async(bookData) => {
    const db = getDb();

    const validAuthor = await authorExists(bookData.authorId);
    if (!validAuthor) {
        throw new Error(`Author with id "${bookData.authorId}" does not exist`);
    }
    const collection = db.collection('books');
    const result = await collection.insertOne(bookData);
    return result;
};

const updateBook = async (bookId, bookData) => {
    const db = getDb();

    if (bookData.authorId) {
        const validAuthor = await authorExits(bookData.authorId);
        if (!validAuthor) {
            throw new Error(`Author with id "${bookData.authorId}" does not exist`);
        }
    }

    const collection = db.collection('books');
    const result = await collection.updateOne(
        { id: bookId},
        { $set: bookData}
    ); 
    return result;
};

const deleteBook = async (bookId) => {
    const db = getDb();
    const collection = db.collection('books');
    const result = await collection.deleteOne({ id: bookId});
    return result;
};

export {getAllBooks, getBookById, createBook, updateBook, deleteBook, authorExits};

