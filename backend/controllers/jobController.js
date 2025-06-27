// backend/controllers/jobController.js
const pool = require('../db');

// GET /api/jobs
exports.getJobs = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT j.*, u.name AS posted_by
       FROM jobs j
       JOIN users u ON j.user_id = u.id
       ORDER BY j.created_at DESC
       LIMIT 100`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

// GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await pool.getConnection();
    const [job] = await conn.query('SELECT * FROM jobs WHERE id = ?', [id]);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

// POST /api/jobs
exports.postJob = async (req, res) => {
  const {
    title, description, budget, location, suburb, postcode, region_id, user_id,
    category, tools_required, start_date
  } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO jobs 
        (title, description, budget, location, suburb, postcode, region_id, user_id, category, tools_required, start_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, budget, location, suburb, postcode, region_id, user_id, category, tools_required, start_date]
    );
    res.status(201).json({ message: 'Job posted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

// POST /api/jobs/:id/complete
exports.completeJob = async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE jobs SET status = 'completed', completed_at = NOW() WHERE id = ?`,
      [id]
    );
    res.json({ message: 'Job marked as complete' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
};
