# Books Microservice

A RESTful microservice for managing library books with CRUD operations.

## Features

- Get all books
- Get a specific book by ID
- Create new books
- Update existing books
- Delete books
- Borrow books (decreases available copies)
- Return books (increases available copies)
- Health check endpoint

## API Endpoints

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| GET    | /api/books                | Get all books                  |
| GET    | /api/books/:id            | Get a specific book            |
| POST   | /api/books                | Create a new book              |
| PUT    | /api/books/:id            | Update a book                  |
| DELETE | /api/books/:id            | Delete a book                  |
| POST   | /api/books/:id/borrow     | Borrow a book                  |
| POST   | /api/books/:id/return     | Return a book                  |
| GET    | /health                   | Health check                   |

## Book Model

```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "978-0-00-000000-0",
  "publishedYear": 2020,
  "genre": "Fiction",
  "availableCopies": 3,
  "totalCopies": 5
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the books-service directory:
   ```bash
   cd backend/books-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the service:
   ```bash
   npm start
   ```

The service will start on port 3000 by default. You can access it at `http://localhost:3000`.

### Environment Variables

- `PORT` - Port number for the service (default: 3000)

## Example Requests

### Get all books
```bash
curl http://localhost:3000/api/books
```

### Create a new book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0-7432-7356-5",
    "publishedYear": 1925,
    "genre": "Fiction",
    "availableCopies": 2,
    "totalCopies": 2
  }'
```

### Borrow a book
```bash
curl -X POST http://localhost:3000/api/books/1/borrow
```

### Return a book
```bash
curl -X POST http://localhost:3000/api/books/1/return
```

## Data Storage

The service uses an in-memory data store, which means all data will be reset when the service restarts. For production use, consider integrating with a database like MongoDB, PostgreSQL, or MySQL.
