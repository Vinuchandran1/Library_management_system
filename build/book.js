"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    // public readonly id : number;
    // public readonly title : string;
    // public readonly author : string;
    // private isIssued : boolean;
    constructor(id, title, author, isIssued = false) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isIssued = isIssued;
        // this.id = id;
        // this.title = title;
        // this.author = author;
        // this.isIssued = false;
    }
    issueBook() {
        if (this.isIssued) {
            throw new Error(`The book "${this.title}" is already issued !.`);
        }
        else {
            this.isIssued = true;
            return true;
        }
    }
    returnBook() {
        if (this.isIssued) {
            this.isIssued = false;
            return true;
        }
        else {
            throw new Error(`The book "${this.title}" is not issued to anyone.`);
        }
    }
    isBookIssued() {
        return this.isIssued;
    }
}
exports.Book = Book;
// let newBook = new Book("B1","Rich Dad Poor Dad","Don't know");
// console.log (`Book Details : \n Book id : ${newBook.id} \n Book title : ${newBook.title} \nAuthor : ${newBook.author} \nBook status: ${newBook.isBookIssued()}`);
// newBook.issueBook();
// console.log (`Book Details : \n Book id : ${newBook.id} \n Book title : ${newBook.title} \nAuthor : ${newBook.author} \nBook status: ${newBook.isBookIssued()}`);
// newBook.returnBook();
// console.log (`Book Details : \n Book id : ${newBook.id} \n Book title : ${newBook.title} \nAuthor : ${newBook.author} \nBook status: ${newBook.isBookIssued()}`);
