import { Book } from "./book";
import { User } from "./user";

export class Library{
    public Books :Map<number,Book> = new Map();
    public Users :Map<number,User> = new Map();

    public static bookCounter = 1;
    public static userCounter = 1;

    addBook(title : string,author : string){
        const newBook = new Book(Library.bookCounter++,title,author);
        this.Books.set(newBook.id,newBook);
        return newBook;
    }

    removeBook(bookId : number){
        const book = this.Books.get(bookId);
        if (book && !book.isBookIssued()){
            this.Books.delete(bookId);
            return true;

        }else{
            throw new Error("Book cannot be removed. It may be already issued or it doesn't exist");
        }
    }
    addUser(username : string){
        const newUser = new User(Library.userCounter++,username);
        this.Users.set(newUser.id,newUser);
        return newUser;
    }

    removeUser(userId : number){
        const user = this.Users.get(userId);
        if (!user){
            throw new Error("User not found.");

        }
        user.getIssuedBooks().forEach(i => {
            const book = this.Books.get(i);
            if (book){
                user.returnBook(book);
            }
        });
        this.Users.delete(userId);
        return true;
    }

    issueBookToUser(bookId : number,userId : number){
        const book = this.Books.get(bookId);
        const user = this.Users.get(userId);
        if (!book){
            throw new Error("Book not Found !");
        }
        if (!user){
            throw new Error("User not Found !.");
        }
        return user.issueBook(book);
        
    }
    
    returnBookFromUser(bookId:number,userId:number){
        const book = this.Books.get(bookId);
        const user = this.Users.get(userId);
        if (!book){
            throw new Error("Book not Found !");
        }
        if (!user){
            throw new Error("User not Found !.");
        }
        return user.returnBook(book);

    }

    getAllBooks():Book[]{
        return Array.from(this.Books.values());
    }

    getAllUsers() : User[]{
        return Array.from(this.Users.values());
    }

}