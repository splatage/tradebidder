const db = require('../db');

exports.getDashboard = async (req, res) => {
  let conn;
  try {
    // Use user ID from auth middleware (recommended) or fallback to query param for testing
    const userId = req.user?.id || req.query.user_id;
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    conn = await db.getConnection();

    // 1. User details
    const [user] = await conn.query(
      'SELECT id, name, email, is_verified, created_at FROM users WHERE id = ?', [userId]
    );

    // 2. Jobs posted by user
    const jobs = await conn.query(
      'SELECT id, title, is_active, created_at FROM jobs WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
      [userId]
    );

    // 3. All bids by user (include job title via JOIN)
    const bids = await conn.query(
      `SELECT b.id, b.job_id, b.amount, b.status, b.created_at, j.title AS job_title
       FROM bids b
       JOIN jobs j ON b.job_id = j.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC LIMIT 10`,
      [userId]
    );

    // 4. Accepted/won bids by user (include job title)
    const acceptedBids = await conn.query(
      `SELECT b.id, b.job_id, b.amount, b.status, b.created_at, j.title AS job_title
       FROM bids b
       JOIN jobs j ON b.job_id = j.id
       WHERE b.user_id = ? AND b.status = 'accepted'
       ORDER BY b.created_at DESC LIMIT 10`,
      [userId]
    );

    // 5. Recent notifications (last 5)
    const notifications = await conn.query(
      `SELECT id, type, title, message, link, is_read, created_at
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC LIMIT 5`,
      [userId]
    );

    // 6. Portfolio items (last 3)
    const portfolio = await conn.query(
      `SELECT id, title, image_url, created_at
       FROM portfolio_items
       WHERE user_id = ?
       ORDER BY created_at DESC LIMIT 3`,
      [userId]
    );

    res.json({
      user: user?.[0] || {},
      jobs,
      bids,
      acceptedBids,
      notifications,
      portfolio
    });
  } catch (err) {
    console.error('getDashboard error:', err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  } finally {
    if (conn) conn.release();
  }
};
