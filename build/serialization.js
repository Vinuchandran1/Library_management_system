"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToFile = saveToFile;
exports.loadFromFile = loadFromFile;
const fs = __importStar(require("fs"));
const library_1 = require("./library");
const book_1 = require("./book");
const user_1 = require("./user");
function saveToFile(library, filename) {
    const books = library.getAllBooks().map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        isIssued: book.isBookIssued()
    }));
    const users = library.getAllUsers().map(user => ({
        id: user.id,
        username: user.username,
        issuedBooks: user.getIssuedBooks()
    }));
    const data = JSON.stringify({ books, users }, null, 2);
    fs.writeFileSync(filename, data);
}
function loadFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    const parsedData = JSON.parse(data);
    const library = new library_1.Library();
    parsedData.books.forEach((b) => {
        const book = new book_1.Book(b.id, b.title, b.author, b.isIssued);
        library.Books.set(b.id, book);
    });
    if (parsedData.books.length > 0) {
        library_1.Library.bookCounter = Math.max(...parsedData.books.map((b) => b.id)) + 1;
    }
    parsedData.users.forEach((u) => {
        const user = new user_1.User(u.id, u.username);
        u.issuedBooks.forEach((bookId) => {
            const book = library.Books.get(bookId);
            if (book) {
                if (!book.isBookIssued()) {
                    user.issueBook(book);
                }
                else {
                    user.addIssuedBookId(book.id);
                }
            }
        });
        library.Users.set(u.id, user);
    });
    if (parsedData.users.length > 0) {
        library_1.Library.userCounter = Math.max(...parsedData.users.map((u) => u.id)) + 1;
    }
    return library;
}
