import * as fs from 'fs';
import { Library } from "./library"
import { Book } from './book';
import { User } from './user';
export function saveToFile(library : Library , filename : string) : void {
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

    const data = JSON.stringify({ books, users },null,2);
    fs.writeFileSync(filename, data);
}
export function loadFromFile(filename: string): Library {
  const data = fs.readFileSync(filename, 'utf-8');
  const parsedData = JSON.parse(data);
  const library = new Library();

  parsedData.books.forEach((b:any) => {
    const book = new Book(b.id,b.title,b.author,b.isIssued)
    library.Books.set(b.id,book);
  });

  if (parsedData.books.length > 0) {
    Library.bookCounter = Math.max(...parsedData.books.map((b: any) => b.id)) + 1;
  }

  parsedData.users.forEach((u:any) => {
    const user = new User(u.id,u.username)

    u.issuedBooks.forEach((bookId:number) => {
        const book = library.Books.get(bookId);
        if (book){
            if (!book.isBookIssued()) {
                user.issueBook(book);
            } else {
                user.addIssuedBookId(book.id);
            }
        }
    });
    library.Users.set(u.id,user);
  });

  if (parsedData.users.length > 0) {
    Library.userCounter = Math.max(...parsedData.users.map((u: any) => u.id)) + 1;
  }

  return library;
}
