"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
const book_1 = require("./book");
const user_1 = require("./user");
class Library {
    constructor() {
        this.Books = new Map();
        this.Users = new Map();
    }
    addBook(title, author) {
        const newBook = new book_1.Book(Library.bookCounter++, title, author);
        this.Books.set(newBook.id, newBook);
        return newBook;
    }
    removeBook(bookId) {
        const book = this.Books.get(bookId);
        if (book && !book.isBookIssued()) {
            this.Books.delete(bookId);
            return true;
        }
        else {
            throw new Error("Book cannot be removed. It may be already issued or it doesn't exist");
        }
    }
    addUser(username) {
        const newUser = new user_1.User(Library.userCounter++, username);
        this.Users.set(newUser.id, newUser);
        return newUser;
    }
    removeUser(userId) {
        const user = this.Users.get(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        user.getIssuedBooks().forEach(i => {
            const book = this.Books.get(i);
            if (book) {
                user.returnBook(book);
            }
        });
        this.Users.delete(userId);
        return true;
    }
    issueBookToUser(bookId, userId) {
        const book = this.Books.get(bookId);
        const user = this.Users.get(userId);
        if (!book) {
            throw new Error("Book not Found !");
        }
        if (!user) {
            throw new Error("User not Found !.");
        }
        return user.issueBook(book);
    }
    returnBookFromUser(bookId, userId) {
        const book = this.Books.get(bookId);
        const user = this.Users.get(userId);
        if (!book) {
            throw new Error("Book not Found !");
        }
        if (!user) {
            throw new Error("User not Found !.");
        }
        return user.returnBook(book);
    }
    getAllBooks() {
        return Array.from(this.Books.values());
    }
    getAllUsers() {
        return Array.from(this.Users.values());
    }
}
exports.Library = Library;
Library.bookCounter = 1;
Library.userCounter = 1;
