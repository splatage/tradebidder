const jwt = require('jsonwebtoken');
const db = require('../db'); // Optional: for user lookups if needed

/**
 * Middleware: Checks for JWT, verifies it, and sets req.user.
 * Expects Authorization: Bearer <token>
 * Expects JWT payload to include user UUID as user.uuid
 */
module.exports = async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  try {
    // Replace 'your_jwt_secret' with process.env.JWT_SECRET or your config
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

    // Attach user data to req.user
    // If you want to re-fetch user details from DB, uncomment below:
    /*
    const [user] = await db.query('SELECT * FROM users WHERE uuid = ?', [payload.uuid]);
    if (!user) return res.status(401).json({ error: 'User not found.' });
    req.user = user;
    */
    // Otherwise, trust the JWT payload:
    req.user = payload.user || payload; // e.g. { uuid, email, role }
    next();
  } catch (err) {
    console.error('JWT auth error:', err);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
