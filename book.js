//Book Class: Represents a Book
class Book{
    constructor(title, author, order) {
        this.title = title;
        this.author = author;
        this.order = order;
    }
}
//UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Dune',
                author: 'Frank Herbert',
                order: '1'
            },
            {
                title: 'Dune Messiah',
                author: 'Frank Herbert',
                order: '2'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML =  `
           <td>${book.title}</td>
           <td>${book.author}</td>
           <td>${book.order}</td>
           <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        
        list.appendChild(row);
    }
}

//Store Class: Handles Storage

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a book

//Event: Remove a book

