const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // Your MySQL host
  user: 'root',      // Your MySQL username
  password: 'password', // Your MySQL password
  database: 'fyp',   // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
