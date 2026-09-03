import  { getDb }   from '../db/connect.js';

const getAllbooks = async() => {
    const db = getDb();
    const books = await db.collection('books').find({}).toArray();
    return books;
}

export {getAllbooks};