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
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML =  `
           <td>${book.title}</td>
           <td>${book.author}</td>
           <td>${book.order}</td>
           <td><a href="#" class="btn delete">X</a></td>
        `;
        
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    // <div class="alert">Whatever the message is</div>
    // static showAlert(message, claseName) {
    //     const div = document.createElement('div');
    //     div.className = `alert alert-${className}`;
    //     div.appendChild(document.createTextNode(message));
    //     const container = document.querySelector('.container');
    //     const form = document.querySelector(`#book-form`);
    //     container.insertBefore(div, form);
    //setTimeout(() => document.querySelector('.alert').remove(), 3000);
    // }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#order').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(order) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.order === order) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const order = document.querySelector('#order').value;

    //validate
    if(title === '' || author === '' || order === '') {
        alert('Please enter a value into each field.');
    } else {

    //Instatiate book
    const book = new Book(title, author, order);

    //Add book to UI
    UI.addBookToList(book);

    //Add book to store
    Store.addBook(book);

    //clearing fields
    UI.clearFields();
    }

});

//Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)

    //Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
    
    //remove book from store
    // Store.removeBook(e.target.parentElement.previousElementSibling.textContent);







// let express = require('express');
// let app = express();

// let router = express.Router();

// router.get('/', function (req, res, next) {
//     res.send("Book");
// });

// app.use('/api/', router)

// var server = app.listen(4000, function() {
//     console.log('Node server is running on http://localhost:4000')
// })




