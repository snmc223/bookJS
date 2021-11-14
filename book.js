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


  // OpenWeatherMap API.
const api = '1617ef01375e4b5e86dfad92fab32dcc'; 

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.cel');
const tempF = document.querySelector('.far');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});

//countdown
const countdown = () => {
    const countDate = new Date('December 31, 2021 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    //how time works
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    //calcutate the time
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.querySelector('.day').innerText = textDay;
    document.querySelector('.hour').innerText = textHour;
    document.querySelector('.minute').innerText = textMinute;
    document.querySelector('.second').innerText = textSecond;

};

setInterval(countdown, 1000);
        
            