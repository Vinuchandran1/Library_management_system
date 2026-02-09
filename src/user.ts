import { Book } from "./book";

export class User{
    public readonly id : number;
    public readonly username : string;
    private issuedBooks : Set<number> = new Set();
    constructor(id:number,username:string){
        this.id = id;
        this.username = username;

    }
    
    
    
    issueBook(book: Book):boolean{
        if (book.isBookIssued() && this.issuedBooks.has(book.id)){
            throw new Error (`The Book "${book.title}" is already issued !.` )

        }
        book.issueBook();
        this.issuedBooks.add(book.id);
        return true;
    }

    returnBook(book:Book) : boolean{
        if(!this.issuedBooks.has(book.id)){
            throw new Error (`The book "${book.title}" is not issued !.`);
        }
        book.returnBook();
        this.issuedBooks.delete(book.id);
        return true;
    }

    getIssuedBooks() : number[]{
        return Array.from(this.issuedBooks)
    }

    addIssuedBookId(id: number): void {
        this.issuedBooks.add(id);
    }
}

// let book1 = new Book("B1","Rich Dad Poor Dad","ABC");
// let book2 = new Book("B2","Money","XYZ");


// let newUser = new User("U1","Vinu");
// newUser.issueBook(book1);
// newUser.issueBook(book2);

// newUser.listIssuedBooks();
// newUser.returnBook(book1);
// newUser.listIssuedBooks();

