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
const library_1 = require("./library");
const serialization_1 = require("./serialization");
const readlineSync = __importStar(require("readline-sync"));
let library;
function initializeLibrary() {
    try {
        library = (0, serialization_1.loadFromFile)('libraryState.json');
        console.log('Library Loaded From file.');
    }
    catch (error) {
        console.error('Error loading library:', error.message || error);
        console.log("No library data found. So starting a new library instance.");
        library = new library_1.Library();
    }
}
function promptMenu() {
    let flag = true;
    while (flag) {
        console.log("\nLibrary Management System. ");
        console.log("1. Add a Book");
        console.log("2. Remove a Book");
        console.log("3. Add a User");
        console.log("4. Remove a User");
        console.log("5. Issue Book to a User");
        console.log("6. Return a book from a user");
        console.log("7. View Issued Books for a User");
        console.log("8.List all books");
        console.log("9.List all users");
        console.log("10.Exit the app");
        const option = readlineSync.question("Choose an option(1-10) : ");
        switch (option) {
            case '1':
                const title = readlineSync.question("Enter the name of the Book : ");
                const author = readlineSync.question("Enter the author of the book : ");
                const book = library.addBook(title, author);
                console.log(`Book added : ${book.title}`);
                break;
            case '2':
                const bookId = readlineSync.questionInt("Enter book id to remove : ");
                try {
                    library.removeBook(bookId);
                    console.log("Book Removed.");
                }
                catch (error) {
                    console.error(error.message);
                }
                break;
            case '3':
                const username = readlineSync.question("Enter the name of the user : ");
                const user = library.addUser(username);
                console.log(`User added : ${user.username}`);
                break;
            case '4':
                let userId = readlineSync.questionInt("Enter the ID of the user to be removed : ");
                try {
                    library.removeUser(userId);
                    console.log("User removed");
                }
                catch (error) {
                    console.error(error.message);
                }
                break;
            case '5':
                const userIdToIssue = readlineSync.questionInt("Enter the user id : ");
                const bookIdToIssue = readlineSync.questionInt("Enter the book id to issue : ");
                try {
                    library.issueBookToUser(bookIdToIssue, userIdToIssue);
                    console.log("Book issued to the user.");
                }
                catch (error) {
                    console.error(error.message);
                }
                break;
            case '6':
                const userIdToReturn = readlineSync.questionInt("Enter the user id : ");
                const bookIdToReturn = readlineSync.questionInt("Enter the book id to be returned : ");
                try {
                    library.returnBookFromUser(bookIdToReturn, userIdToReturn);
                    console.log("The book is returned successfully !.");
                }
                catch (error) {
                    console.error(error.message);
                }
                break;
            case '7':
                const userIdView = readlineSync.questionInt("Enter the user ID to view issued books: ");
                const view_user = library.Users.get(userIdView);
                if (!view_user) {
                    console.log("User not found.");
                    break;
                }
                const issuedIds = view_user.getIssuedBooks();
                if (issuedIds.length === 0) {
                    console.log(`User ${view_user.username} has no issued books.`);
                    break;
                }
                const issuedBooks = issuedIds.map(id => library.Books.get(id)).filter(book => book);
                if (issuedBooks.length === 0) {
                    console.log("No valid issued books found.");
                    break;
                }
                const userBooks = issuedBooks.map(book => ({
                    'ID': book.id,
                    'Title': book.title,
                    'Author': book.author
                }));
                console.table(userBooks);
                break;
            case '8':
                const booksList = library.getAllBooks();
                const booksTable = booksList.map(book => ({
                    'ID': book.id,
                    'Title': book.title,
                    'Author': book.author,
                    'Issued': book.isBookIssued() ? 'YES' : 'NO'
                }));
                console.table(booksTable);
                break;
            case '9':
                const usersList = library.getAllUsers();
                const usersTable = usersList.map(user => ({
                    'ID': user.id,
                    'Username': user.username,
                    'Issued Books': user.getIssuedBooks().length
                }));
                console.table(usersTable);
                break;
            case '10':
                (0, serialization_1.saveToFile)(library, 'libraryState.json');
                console.log("Library State saved, exiting !.");
                flag = false;
                break;
            default:
                console.log("Invalid option : Please Try again.");
                break;
        }
    }
}
initializeLibrary();
promptMenu();
