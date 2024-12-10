"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBook = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("../entities/Book");
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, publishedDate, numberOfPages } = req.body;
        const bookRepository = (0, typeorm_1.getRepository)(Book_1.Book);
        const newBook = bookRepository.create({
            title,
            author,
            publishedDate,
            numberOfPages,
        });
        const savedBook = yield bookRepository.save(newBook);
        res.status(201).json(savedBook);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error adding book', error: errorMessage });
    }
});
exports.addBook = addBook;
