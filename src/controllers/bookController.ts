import { Request, RequestHandler, Response } from 'express';
import { AppDataSource } from '../data-source'; 
import { Book } from '../entities/Book';

export const addBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, publishedDate, numberOfPages } = req.body;

        const bookRepository = AppDataSource.getRepository(Book);
        const newBook = bookRepository.create({
            title,
            author,
            publishedDate,
            numberOfPages,
        });

        const savedBook = await bookRepository.save(newBook);

        res.status(201).json(savedBook);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error adding book', error: errorMessage });
    }

};

// Add this function in your controller

export const getAllBooks: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookRepository = AppDataSource.getRepository(Book);

        // Retrieve all books from the database
        const books = await bookRepository.find();

        res.status(200).json(books);  // Return the list of books
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error retrieving books', error: errorMessage });
    }
};

// Add this function in your controller

export const getBookById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;  // Extract the ID from the request params

        // Convert the id to a number
        const bookId = Number(id);

        if (isNaN(bookId)) {
            res.status(400).json({ message: 'Invalid book ID' });
            return;
        }

        const bookRepository = AppDataSource.getRepository(Book);

        const book = await bookRepository.findOne({
            where: { id: bookId },
        });

        if (!book) {
            res.status(404).json({ message: `Book with id ${id} not found` });
        } else {
            res.status(200).json(book);  // Return the book details
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error retrieving book', error: errorMessage });
    }
};


// Update a Book's Details
export const updateBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, author, publishedDate, numberOfPages } = req.body;

    try {
        const bookRepository = AppDataSource.getRepository(Book);
        // Convert the id to a number
        const bookId = Number(id);

        if (isNaN(bookId)) {
            res.status(400).json({ message: 'Invalid book ID' });
            return;
        }

        const book = await bookRepository.findOne({
            where: { id: bookId },
        });

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        // Update book properties
        book.title = title || book.title;
        book.author = author || book.author;
        book.publishedDate = publishedDate || book.publishedDate;
        book.numberOfPages = numberOfPages || book.numberOfPages;

        const updatedBook = await bookRepository.save(book);
        res.status(200).json(updatedBook);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error updating book', error: errorMessage });
    }
};

// Delete a Book
export const deleteBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Convert the id to a number
        const bookId = Number(id);

        if (isNaN(bookId)) {
            res.status(400).json({ message: 'Invalid book ID' });
            return;
        }

        const bookRepository = AppDataSource.getRepository(Book);

        const book = await bookRepository.findOne({
            where: { id: bookId },
        });


        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        await bookRepository.remove(book);
        res.status(200).json({ message: 'Book successfully deleted' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error deleting book', error: errorMessage });
    }
};