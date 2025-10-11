/**
 * Books Microservice
 * 
 * A microservice for managing library books with CRUD operations
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database for books
let books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    publishedYear: 1960,
    genre: "Fiction",
    availableCopies: 3,
    totalCopies: 5
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    publishedYear: 1949,
    genre: "Science Fiction",
    availableCopies: 2,
    totalCopies: 4
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    publishedYear: 1813,
    genre: "Romance",
    availableCopies: 4,
    totalCopies: 4
  }
];

let nextId = 4;

// Routes

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});

// Create a new book
app.post('/api/books', (req, res) => {
  const { title, author, isbn, publishedYear, genre, availableCopies, totalCopies } = req.body;
  
  // Validation
  if (!title || !author || !isbn) {
    return res.status(400).json({ error: 'Title, author, and ISBN are required' });
  }
  
  const newBook = {
    id: nextId++,
    title,
    author,
    isbn,
    publishedYear: publishedYear || new Date().getFullYear(),
    genre: genre || 'Unknown',
    availableCopies: availableCopies || 1,
    totalCopies: totalCopies || 1
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const { title, author, isbn, publishedYear, genre, availableCopies, totalCopies } = req.body;
  
  books[bookIndex] = {
    ...books[bookIndex],
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author,
    isbn: isbn || books[bookIndex].isbn,
    publishedYear: publishedYear !== undefined ? publishedYear : books[bookIndex].publishedYear,
    genre: genre || books[bookIndex].genre,
    availableCopies: availableCopies !== undefined ? availableCopies : books[bookIndex].availableCopies,
    totalCopies: totalCopies !== undefined ? totalCopies : books[bookIndex].totalCopies
  };
  
  res.json(books[bookIndex]);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ message: 'Book deleted successfully', book: deletedBook });
});

// Borrow a book (decrease available copies)
app.post('/api/books/:id/borrow', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  if (book.availableCopies <= 0) {
    return res.status(400).json({ error: 'No copies available' });
  }
  
  book.availableCopies--;
  res.json({ message: 'Book borrowed successfully', book });
});

// Return a book (increase available copies)
app.post('/api/books/:id/return', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  if (book.availableCopies >= book.totalCopies) {
    return res.status(400).json({ error: 'All copies are already returned' });
  }
  
  book.availableCopies++;
  res.json({ message: 'Book returned successfully', book });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'books-service', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Books microservice running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/books`);
});
