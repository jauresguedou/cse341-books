import {getAllbooks, getBookById} from '../models/books.js';
import {getAllbooks} from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try{
        const books = await getAllbooks(); 
        return res.status(200).json(books);
    }catch (error)  {
        console.error('Failed to fetch books:', error.message);
        return res.status(500).json({error: 'Internal Server Error' });
    }
}

const getBookByIdHandler = async (req, res) => {
    const requestId= req.params.id;
    try {
        const book = await getBookById(requestId);
        if(!book) {
            return res.status(404).json({"message": "Book not found"});
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed:', error.message);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}
export {getBooksHandler, getBookByIdHandler};
export {getBooksHandler};
