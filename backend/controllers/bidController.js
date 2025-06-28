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
