# Employee CRUD Application

A simple employee table CRUD (Create, Read, Update, Delete) application built with Node.js, Express, Knex.js, and SQLite to illustrate Knex implementation.

## Features

- **Create**: Add new employees with details like name, email, department, position, and salary
- **Read**: View all employees in a table format
- **Update**: Edit existing employee information
- **Delete**: Remove employees from the database
- Built with Knex.js query builder for database operations
- SQLite database for data persistence
- Clean and responsive web interface

## Technology Stack

- **Backend**: Node.js + Express
- **Database Query Builder**: Knex.js
- **Database**: SQLite3
- **Frontend**: Vanilla JavaScript, HTML5, CSS3

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Navigate to the employee-crud directory:
   ```bash
   cd employee-crud
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run database migrations:
   ```bash
   npm run migrate
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

| Method | Endpoint                | Description              |
|--------|------------------------|--------------------------|
| GET    | `/api/employees`       | Get all employees        |
| GET    | `/api/employees/:id`   | Get a single employee    |
| POST   | `/api/employees`       | Create a new employee    |
| PUT    | `/api/employees/:id`   | Update an employee       |
| DELETE | `/api/employees/:id`   | Delete an employee       |

## Database Schema

The `employees` table includes the following fields:

- `id` (integer, primary key, auto-increment)
- `first_name` (string, required)
- `last_name` (string, required)
- `email` (string, required, unique)
- `department` (string, optional)
- `position` (string, optional)
- `salary` (decimal, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Knex.js Highlights

This application demonstrates several Knex.js features:

1. **Configuration**: See `knexfile.js` for database configuration
2. **Migrations**: Database schema version control in `/migrations`
3. **Query Building**: CRUD operations using Knex query builder
4. **Schema Builder**: Table creation with data types and constraints

### Example Knex Queries Used

```javascript
// SELECT all employees
await db('employees').select('*');

// INSERT new employee
await db('employees').insert({ first_name, last_name, email });

// UPDATE employee
await db('employees').where('id', id).update({ first_name, last_name });

// DELETE employee
await db('employees').where('id', id).delete();
```

## Available NPM Scripts

- `npm start` - Start the Express server
- `npm run migrate` - Run database migrations
- `npm run rollback` - Rollback last migration

## Project Structure

```
employee-crud/
├── migrations/           # Database migrations
├── public/              # Frontend files
│   ├── index.html      # Main HTML page
│   ├── styles.css      # CSS styles
│   └── app.js          # Frontend JavaScript
├── knexfile.js         # Knex configuration
├── server.js           # Express server & API endpoints
├── package.json        # Project dependencies
└── employees.db        # SQLite database (created after migration)
```

## License

This project is open source and available under the MIT License.
