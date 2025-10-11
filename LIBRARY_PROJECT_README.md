# Library Management System

A full-stack library management application built with Angular frontend and Node.js microservices backend. This system allows you to manage books in a library with features like adding, viewing, borrowing, and returning books.

## Architecture

This project follows a microservices architecture:

- **Frontend**: Angular 20+ application with standalone components
- **Backend**: Node.js/Express microservice for books management
- **Communication**: RESTful API

## Project Structure

```
.
├── library-management/          # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # UI components
│   │   │   │   ├── book-list/   # Display books
│   │   │   │   └── book-form/   # Add new books
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   ├── services/        # API services
│   │   │   └── app.*            # Main app component
│   │   └── styles.css           # Global styles
│   └── README.md                # Angular app documentation
│
└── backend/
    └── books-service/           # Books microservice
        ├── server.js            # Express server
        ├── package.json
        └── README.md            # Service documentation
```

## Features

### Books Management
- ✅ View all books in the library
- ✅ Add new books
- ✅ Update book details
- ✅ Delete books
- ✅ Borrow books (decrease available copies)
- ✅ Return books (increase available copies)
- ✅ Real-time availability tracking

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- Angular CLI (v20 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skills-getting-started-with-github-copilot
   ```

2. **Install Angular CLI** (if not already installed)
   ```bash
   npm install -g @angular/cli
   ```

3. **Set up the backend service**
   ```bash
   cd backend/books-service
   npm install
   ```

4. **Set up the frontend**
   ```bash
   cd ../../library-management
   npm install
   ```

### Running the Application

You need to run both the backend service and the frontend application.

#### 1. Start the Backend Service

```bash
cd backend/books-service
npm start
```

The backend will start on `http://localhost:3000`

#### 2. Start the Frontend Application

In a new terminal:

```bash
cd library-management
ng serve
```

The Angular app will start on `http://localhost:4200`

Open your browser and navigate to `http://localhost:4200` to use the application.

## API Documentation

### Books Service API

Base URL: `http://localhost:3000/api`

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | /books                | Get all books                  |
| GET    | /books/:id            | Get a specific book            |
| POST   | /books                | Create a new book              |
| PUT    | /books/:id            | Update a book                  |
| DELETE | /books/:id            | Delete a book                  |
| POST   | /books/:id/borrow     | Borrow a book                  |
| POST   | /books/:id/return     | Return a book                  |
| GET    | /health               | Health check                   |

### Book Model

```typescript
interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  availableCopies: number;
  totalCopies: number;
}
```

## Technology Stack

### Frontend
- **Framework**: Angular 20
- **Language**: TypeScript
- **Styling**: CSS3
- **HTTP Client**: Angular HttpClient
- **Forms**: Angular Forms (Template-driven)

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Middleware**: CORS, Body-parser
- **Data Storage**: In-memory (for development)

## Development

### Frontend Development

```bash
cd library-management
ng serve                 # Start dev server
ng build                 # Build for production
ng test                  # Run unit tests
ng generate component    # Generate new component
```

### Backend Development

```bash
cd backend/books-service
npm start                # Start the server
npm run dev              # Start with auto-reload
```

## Future Enhancements

- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Book search and filtering
- [ ] Borrowing history
- [ ] Due date tracking
- [ ] Email notifications
- [ ] Additional microservices (users, loans, etc.)
- [ ] Docker containerization
- [ ] Unit and integration tests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
