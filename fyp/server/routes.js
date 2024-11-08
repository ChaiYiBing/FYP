const express = require('express');
const db = require('./db');
const router = express.Router();

// Get all products
router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Add product to favorites
router.post('/favorites', (req, res) => {
  const { userId, productId } = req.body;
  const sql = `INSERT INTO favourites (user_id, product_id) VALUES (?, ?)`;
  db.query(sql, [userId, productId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Added to favorites', id: result.insertId });
    }
  });
});

// Add to cart
router.post('/cart', (req, res) => {
  const { userId, productId } = req.body;
  const sql = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)`;
  db.query(sql, [userId, productId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Added to cart', id: result.insertId });
    }
  });
});

// Remove from cart
router.delete('/cart/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM cart WHERE product_id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Removed from cart' });
    }
  });
});

module.exports = router;
