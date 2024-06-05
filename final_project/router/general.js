const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function searchByIsbn(isbn, bookData){
    const results = [];
    for(const bookId in bookData) {
        if (bookData.hasOwnProperty(bookId)) {
            const book = bookData[bookId];
            if (book.isbn === isbn) {
                results.push(book);
            }
        }
    }
    return results;
}

function searchByAuthor(author, bookData){
    const results = [];
    for(const bookId in bookData) {
        if (bookData.hasOwnProperty(bookId)) {
            const book = bookData[bookId];
            if (book.author === author) {
                results.push(book);
            }
        }
    }
    return results;
}

function searchByTitle(title, bookData){
    const results = [];
    for(const bookId in bookData) {
        if (bookData.hasOwnProperty(bookId)) {
            const book = bookData[bookId];
            if (book.title === title) {
                results.push(book);
            }
        }
    }
    return results;
}

const bookKeys = Object.keys(books);

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop DONE
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN DONE
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const matchingBooks = searchByIsbn(isbn, books);
    res.json(matchingBooks);
});

// Get book details based on author DONE
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const matchingBooks = searchByAuthor(author, books);
    res.json(matchingBooks);
});

// Get all books based on title DONE
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const matchingBooks = searchByTitle(title, books);
    res.json(matchingBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const matchingBook = searchByIsbn(isbn, books);
});

module.exports.general = public_users;
