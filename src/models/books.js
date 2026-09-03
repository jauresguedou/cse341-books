import  { getDb }   from '../db/connect.js';

const getAllbooks = async() => {
    const db = getDb();
    const books = await db.collection('books').find({}).toArray();
    return books;
}

const getBookById = async (bookId) => {
     const db = getDb();
     const collection = await db.collection('books');
     const book = await collection.findOne({ id: bookId });
     return book;
}

export {getAllbooks, getBookById};

