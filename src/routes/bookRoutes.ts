import { Router } from 'express';
import { addBook, getAllBooks, getBookById, updateBook, deleteBook} from '../controllers/bookController';

const router = Router();

router.post('/books', addBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;
