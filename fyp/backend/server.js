require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true,
  })
);
app.use(bodyParser.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mysql2',
});

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Backend Server is Running!');
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: 'Username or email already exists. Please use a different one.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, "user")',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful!', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// Fetch all products endpoint
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
});

// Fetch sales data for charts
app.get('/api/sales', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        products.name AS product_name, 
        SUM(sales.quantity) AS total_sales, 
        DATE_FORMAT(sales.sale_date, '%M') AS month
      FROM sales
      INNER JOIN products ON sales.product_id = products.id
      GROUP BY products.name, MONTH(sales.sale_date)
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Failed to fetch sales data.' });
  }
});

// Fetch user profile endpoint
app.get('/api/profile', async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required to fetch profile data.' });
  }

  try {
    const [rows] = await pool.execute('SELECT username, email FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ message: 'Failed to fetch profile data.' });
  }
});


// Update user profile endpoint
app.put('/api/profile/update', async (req, res) => {
  const { userId, username, email } = req.body;

  if (!userId || !username || !email) {
    return res.status(400).json({ message: 'User ID, username, and email are required.' });
  }

  try {
    await pool.execute('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, userId]);
    res.status(200).json({ message: 'Profile updated successfully!', username, email });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'An internal server error occurred.' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
