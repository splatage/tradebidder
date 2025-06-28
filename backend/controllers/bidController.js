// backend/controllers/bidController.js
const db = require('../db');

// PLACE BID
exports.placeBid = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const { job_id, user_id, amount, comment } = req.body;

    if (!job_id || !user_id || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await conn.query(
      'INSERT INTO bids (job_id, user_id, amount, comment) VALUES (?, ?, ?, ?)',
      [job_id, user_id, amount, comment || null]
    );
    const insertedId = result.insertId;

    const bid = await conn.query('SELECT * FROM bids WHERE id = ?', [insertedId]);
    res.status(201).json(bid[0]);
  } catch (err) {
    console.error('placeBid error:', err);
    res.status(500).json({ error: 'Failed to place bid' });
  } finally {
    if (conn) conn.release();
  }
};

// backend/controllers/bidController.js
exports.getBidById = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const bidId = req.params.id;

    const rows = await conn.query('SELECT * FROM bids WHERE id = ?', [bidId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Bid not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('getBidById error:', err);
    res.status(500).json({ error: 'Failed to retrieve bid' });
  } finally {
    if (conn) conn.release();
  }
};

// List all accepted/won bids for current user
exports.getAcceptedBids = async (req, res) => {
  let conn;
  try {
    const userId = req.user?.id || req.query.user_id; // Get user ID from auth/session (or query param for admin)
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    conn = await db.getConnection();
    const rows = await conn.query(
      `SELECT b.*, j.title AS job_title, j.location
       FROM bids b
       JOIN jobs j ON b.job_id = j.id
       WHERE b.user_id = ? AND b.status = 'accepted'
       ORDER BY b.created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('getAcceptedBids error:', err);
    res.status(500).json({ error: 'Failed to fetch accepted bids' });
  } finally {
    if (conn) conn.release();
  }
};
