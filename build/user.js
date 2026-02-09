"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, username) {
        this.issuedBooks = new Set();
        this.id = id;
        this.username = username;
    }
    issueBook(book) {
        if (book.isBookIssued() && this.issuedBooks.has(book.id)) {
            throw new Error(`The Book "${book.title}" is already issued !.`);
        }
        book.issueBook();
        this.issuedBooks.add(book.id);
        return true;
    }
    returnBook(book) {
        if (!this.issuedBooks.has(book.id)) {
            throw new Error(`The book "${book.title}" is not issued !.`);
        }
        book.returnBook();
        this.issuedBooks.delete(book.id);
        return true;
    }
    getIssuedBooks() {
        return Array.from(this.issuedBooks);
    }
    addIssuedBookId(id) {
        this.issuedBooks.add(id);
    }
}
exports.User = User;
// let book1 = new Book("B1","Rich Dad Poor Dad","ABC");
// let book2 = new Book("B2","Money","XYZ");
// let newUser = new User("U1","Vinu");
// newUser.issueBook(book1);
// newUser.issueBook(book2);
// newUser.listIssuedBooks();
// newUser.returnBook(book1);
// newUser.listIssuedBooks();
