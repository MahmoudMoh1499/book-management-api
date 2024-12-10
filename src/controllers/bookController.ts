import { Request, RequestHandler, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Book } from '../entities/Book';

const handleError = (res: Response, message: string, error: Error, statusCode: number = 500): void => {
    const errorMessage = error.message || 'Unknown error';
    res.status(statusCode).json({ message, error: errorMessage });
};

const validateBookId = (id: string, res: Response): number | null => {
    const bookId = Number(id);
    if (isNaN(bookId)) {
        res.status(400).json({ message: 'Invalid book ID' });
        return null;
    }
    return bookId;
};

const getBookRepository = () => AppDataSource.getRepository(Book);

export const addBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, publishedDate, numberOfPages } = req.body;
        const bookRepository = getBookRepository();

        const newBook = bookRepository.create({ title, author, publishedDate, numberOfPages });
        const savedBook = await bookRepository.save(newBook);

        res.status(201).json(savedBook);
    } catch (error: any) {
        handleError(res, 'Error adding book', error);
    }
};

export const getAllBooks: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookRepository = getBookRepository();
        const books = await bookRepository.find();
        res.status(200).json(books);
    } catch (error: any) {
        handleError(res, 'Error retrieving books', error);
    }
};

export const getBookById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const bookId = validateBookId(id, res);
        if (bookId === null) return;


        const bookRepository = getBookRepository();
        const book = await bookRepository.findOne({ where: { id: bookId } });

        if (!book) {
            res.status(404).json({ message: `Book with id ${id} not found` });
        } else {
            res.status(200).json(book);
        }
    } catch (error: any) {
        handleError(res, 'Error retrieving book', error);
    }
};

export const updateBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, author, publishedDate, numberOfPages } = req.body;

    try {
        const bookId = validateBookId(id, res);
        if (bookId === null) return;


        const bookRepository = getBookRepository();
        const book = await bookRepository.findOne({ where: { id: bookId } });

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.publishedDate = publishedDate || book.publishedDate;
        book.numberOfPages = numberOfPages || book.numberOfPages;

        const updatedBook = await bookRepository.save(book);
        res.status(200).json(updatedBook);
    } catch (error: any) {
        handleError(res, 'Error updating book', error);
    }
};

export const deleteBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const bookId = validateBookId(id, res);
        if (bookId === null) return;

        const bookRepository = getBookRepository();
        const book = await bookRepository.findOne({ where: { id: bookId } });

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        await bookRepository.remove(book);
        res.status(200).json({ message: 'Book successfully deleted' });
    } catch (error:any) {
        handleError(res, 'Error deleting book', error);
    }
};
