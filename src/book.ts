export class Book {
    // public readonly id : number;
    // public readonly title : string;
    // public readonly author : string;
    // private isIssued : boolean;

    constructor(public id:number,public title:string,public author:string,private isIssued : boolean = false){
        this.id = id;
        this.title = title;
        this.author = author;
        this.isIssued = false;
    }

    issueBook():boolean{
        if(this.isIssued){
            throw new Error(`The book "${this.title}" is already issued !.`)
        }
        else{
            this.isIssued = true;
            return true;
        }
    }
    returnBook():boolean{
        if(this.isIssued){
            this.isIssued = false;
            return true;
        }
        else{
            throw new Error(`The book "${this.title}" is not issued to anyone.`)
        }
    }

    isBookIssued():boolean{
        return this.isIssued;
    }

}

// let newBook = new Book("B1","Rich Dad Poor Dad","Don't know");

// console.log (`Book Details : \n Book id : ${newBook.id} \n Book title : ${newBook.title} \nAuthor : ${newBook.author} \nBook status: ${newBook.isBookIssued()}`);

// newBook.issueBook();
// console.log (`Book Details : \n Book id : ${newBook.id} \n Book title : ${newBook.title} \nAuthor : ${newBook.author} \nBook status: ${newBook.isBookIssued()}`);
// newBook.returnBook();
// console.log (`Book Details : \n Book id : ${newBook.id} \n Book title : ${newBook.title} \nAuthor : ${newBook.author} \nBook status: ${newBook.isBookIssued()}`);
