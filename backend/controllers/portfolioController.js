const db = require('../db');

// Create portfolio entry (auto or manual)
exports.createPortfolioItem = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const {
      user_id,
      job_id,
      title,
      description,
      tags,
      location_city,
      image_url,
      review_excerpt,
      is_public = true
    } = req.body;

    const result = await conn.query(
      `INSERT INTO portfolio_items (user_id, job_id, title, description, tags, location_city, image_url, review_excerpt, is_public)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, job_id, title, description, tags, location_city, image_url, review_excerpt, is_public]
    );

    const [item] = await conn.query(
      'SELECT * FROM portfolio_items WHERE id = ?', [result.insertId]
    );
    res.status(201).json(item[0]);
  } catch (err) {
    console.error('createPortfolioItem error:', err);
    res.status(500).json({ error: 'Failed to create portfolio entry' });
  } finally {
    if (conn) conn.release();
  }
};

// List my portfolio items
exports.listMyPortfolio = async (req, res) => {
  let conn;
  try {
    const user_id = req.user?.id || req.query.user_id;
    if (!user_id) return res.status(401).json({ error: 'Not authenticated' });

    conn = await db.getConnection();
    const items = await conn.query(
      `SELECT * FROM portfolio_items WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );
    res.json(items);
  } catch (err) {
    console.error('listMyPortfolio error:', err);
    res.status(500).json({ error: 'Failed to list portfolio' });
  } finally {
    if (conn) conn.release();
  }
};

// Public: List portfolio for user (only public entries)
exports.listUserPortfolio = async (req, res) => {
  let conn;
  try {
    const userId = req.params.userId;
    conn = await db.getConnection();
    const items = await conn.query(
      `SELECT * FROM portfolio_items WHERE user_id = ? AND is_public = TRUE ORDER BY created_at DESC`,
      [userId]
    );
    res.json(items);
  } catch (err) {
    console.error('listUserPortfolio error:', err);
    res.status(500).json({ error: 'Failed to list public portfolio' });
  } finally {
    if (conn) conn.release();
  }
};

// Edit/approve/hide portfolio entry
exports.updatePortfolioItem = async (req, res) => {
  let conn;
  try {
    const id = req.params.id;
    const fields = [
      'title', 'description', 'tags', 'location_city',
      'image_url', 'review_excerpt', 'is_public'
    ];
    const updates = [];
    const params = [];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        params.push(req.body[field]);
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    params.push(id);

    conn = await db.getConnection();
    await conn.query(
      `UPDATE portfolio_items SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    const [item] = await conn.query(
      'SELECT * FROM portfolio_items WHERE id = ?', [id]
    );
    res.json(item[0]);
  } catch (err) {
    console.error('updatePortfolioItem error:', err);
    res.status(500).json({ error: 'Failed to update portfolio entry' });
  } finally {
    if (conn) conn.release();
  }
};

// Delete (hide) portfolio entry
exports.deletePortfolioItem = async (req, res) => {
  let conn;
  try {
    const id = req.params.id;
    conn = await db.getConnection();
    // Soft-delete: set is_public = FALSE
    await conn.query(
      'UPDATE portfolio_items SET is_public = FALSE WHERE id = ?',
      [id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('deletePortfolioItem error:', err);
    res.status(500).json({ error: 'Failed to hide portfolio entry' });
  } finally {
    if (conn) conn.release();
  }
};
