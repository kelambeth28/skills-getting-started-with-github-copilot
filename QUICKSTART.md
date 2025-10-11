# Quick Start Guide

## 🚀 Running the Library Management System

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start Backend:**
```bash
cd backend/books-service
npm install
npm start
```

The backend will be available at `http://localhost:3000`

**Terminal 2 - Start Frontend:**
```bash
cd library-management
npm install
ng serve
```

The frontend will be available at `http://localhost:4200`

### Option 2: Test Backend API Directly

```bash
# Get all books
curl http://localhost:3000/api/books

# Get a specific book
curl http://localhost:3000/api/books/1

# Add a new book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "isbn": "978-0-547-92822-7",
    "publishedYear": 1937,
    "genre": "Fantasy",
    "availableCopies": 3,
    "totalCopies": 3
  }'

# Borrow a book
curl -X POST http://localhost:3000/api/books/1/borrow

# Return a book
curl -X POST http://localhost:3000/api/books/1/return

# Delete a book
curl -X DELETE http://localhost:3000/api/books/1

# Check service health
curl http://localhost:3000/health
```

## 📝 Features Demonstrated

1. **Add Books**: Fill out the form on the left to add new books
2. **View Books**: All books are displayed in cards on the right
3. **Borrow Books**: Click "Borrow" to decrease available copies
4. **Return Books**: Click "Return" to increase available copies
5. **Delete Books**: Click "Delete" to remove a book (with confirmation)
6. **Real-time Updates**: The UI updates automatically after each action

## 🎯 What This Demonstrates

### Frontend (Angular 20)
- ✅ Standalone components (no NgModule required)
- ✅ Template-driven forms with validation
- ✅ HTTP client for API communication
- ✅ Component communication (parent-child)
- ✅ Reactive state management
- ✅ Modern CSS styling with responsive design

### Backend (Node.js/Express)
- ✅ RESTful API design
- ✅ Microservice architecture
- ✅ CORS configuration for cross-origin requests
- ✅ In-memory data storage
- ✅ Input validation
- ✅ Error handling
- ✅ Health check endpoint

### Best Practices
- ✅ Separation of concerns (components, services, models)
- ✅ TypeScript interfaces for type safety
- ✅ Proper HTTP status codes
- ✅ User feedback (success/error messages)
- ✅ Disabled buttons for invalid states
- ✅ Clean, readable code structure

## 🔧 Troubleshooting

**Problem**: Backend won't start
- Make sure port 3000 is not already in use
- Check that Node.js is installed: `node --version`

**Problem**: Frontend won't start  
- Make sure Angular CLI is installed: `ng version`
- Delete `node_modules` and run `npm install` again

**Problem**: CORS errors in browser
- Make sure the backend is running on port 3000
- Check that CORS is enabled in `backend/books-service/server.js`

**Problem**: Books not loading
- Open browser console (F12) to check for errors
- Verify the backend is running and responding at `http://localhost:3000/api/books`
- Check that the API URL in `library-management/src/app/services/book.ts` is correct

## 📚 Next Steps

To extend this project, you could:

1. **Add Database**: Replace in-memory storage with MongoDB or PostgreSQL
2. **Add Authentication**: Implement user login/registration
3. **Add Search**: Filter books by title, author, or genre
4. **Add Pagination**: For large book collections
5. **Add More Microservices**: Create separate services for users, borrowing records, etc.
6. **Add Docker**: Containerize both frontend and backend
7. **Add Tests**: Unit tests and e2e tests
8. **Deploy**: Host on cloud platforms (AWS, Azure, Heroku, etc.)
