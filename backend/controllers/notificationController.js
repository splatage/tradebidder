const db = require('../db');

// List all notifications for the current user
exports.listNotifications = async (req, res) => {
  let conn;
  try {
    const userId = req.user?.id || req.query.user_id;
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    conn = await db.getConnection();
    const rows = await conn.query(
      `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 100`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('listNotifications error:', err);
    res.status(500).json({ error: 'Failed to load notifications' });
  } finally {
    if (conn) conn.release();
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  let conn;
  try {
    const notifId = req.params.id;
    conn = await db.getConnection();
    await conn.query(
      `UPDATE notifications SET is_read = TRUE WHERE id = ?`,
      [notifId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('markAsRead error:', err);
    res.status(500).json({ error: 'Failed to mark as read' });
  } finally {
    if (conn) conn.release();
  }
};

// Create a notification
// For job-related notifications, pass job_id; otherwise, set title in req.body
exports.createNotification = async (req, res) => {
  let conn;
  try {
    const { user_id, type, message, link, job_id, title } = req.body;
    conn = await db.getConnection();

    let notifTitle = title;

    // If job_id is provided and no title, lookup job title
    if (!notifTitle && job_id) {
      const jobRows = await conn.query('SELECT title FROM jobs WHERE id = ?', [job_id]);
      notifTitle = (jobRows && jobRows[0]) ? jobRows[0].title : '';
    }

    const result = await conn.query(
      `INSERT INTO notifications (user_id, type, title, message, link)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, type, notifTitle || '', message, link]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('createNotification error:', err);
    res.status(500).json({ error: 'Failed to create notification' });
  } finally {
    if (conn) conn.release();
  }
};
