const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const path = require('path');

const app = express();
const db = knex(knexConfig.development);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await db('employees').select('*').orderBy('id', 'desc');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await db('employees').where('id', req.params.id).first();
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { first_name, last_name, email, department, position, salary } = req.body;
    
    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }
    
    const [id] = await db('employees').insert({
      first_name,
      last_name,
      email,
      department,
      position,
      salary
    });
    
    const employee = await db('employees').where('id', id).first();
    res.status(201).json(employee);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// UPDATE employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, department, position, salary } = req.body;
    
    const updated = await db('employees')
      .where('id', req.params.id)
      .update({
        first_name,
        last_name,
        email,
        department,
        position,
        salary,
        updated_at: db.fn.now()
      });
    
    if (!updated) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const employee = await db('employees').where('id', req.params.id).first();
    res.json(employee);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// DELETE employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const deleted = await db('employees').where('id', req.params.id).delete();
    
    if (!deleted) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Employee CRUD API running on http://localhost:${PORT}`);
  console.log(`Database: SQLite with Knex.js`);
});
