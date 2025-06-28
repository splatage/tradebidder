exports.getUserById = (req, res) => res.json({ id: req.params.id, name: 'John Doe', email: 'john@example.com' });
exports.suspendUser = (req, res) => res.json({ message: 'User suspended' });

const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../utils/sendEmail');
const APP_URL = process.env.APP_URL || 'https://yourdomain.com';

exports.registerUser = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const { email, password, name } = req.body;
    // Validate inputs and hash password (implement as needed)

    // Create user (with unverified status)
    const verificationToken = uuidv4();
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await conn.query(
      `INSERT INTO users (email, password, name, email_verified, verification_token, token_expires)
       VALUES (?, ?, ?, FALSE, ?, ?)`,
      [email, password, name, verificationToken, tokenExpires]
    );
    // Send verification email
    const verifyUrl = `${APP_URL}/verify-email?token=${verificationToken}`;
    const subject = "Verify your email address";
    const text = `Welcome to TradeBidder! Please verify your email by clicking the link: ${verifyUrl}\n\nThis link will expire in 24 hours.`;
    // await sendEmail(email, subject, text); // Uncomment when ready

    res.status(201).json({ success: true, message: 'User registered. Please check your email to verify your account.' });
  } catch (err) {
    console.error('registerUser error:', err);
    res.status(500).json({ error: 'Registration failed' });
  } finally {
    if (conn) conn.release();
  }
};

// Email verification endpoint
exports.verifyEmail = async (req, res) => {
  let conn;
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Missing token' });

    conn = await db.getConnection();
    const users = await conn.query(
      `SELECT id, token_expires FROM users WHERE verification_token = ? AND email_verified = FALSE`,
      [token]
    );
    if (users.length === 0) return res.status(400).json({ error: 'Invalid or already used token' });

    const user = users[0];
    if (new Date() > new Date(user.token_expires)) {
      return res.status(400).json({ error: 'Verification token expired' });
    }

    await conn.query(
      `UPDATE users SET email_verified = TRUE, verification_token = NULL, token_expires = NULL WHERE id = ?`,
      [user.id]
    );
    res.json({ success: true, message: 'Email verified! You can now log in.' });
  } catch (err) {
    console.error('verifyEmail error:', err);
    res.status(500).json({ error: 'Verification failed' });
  } finally {
    if (conn) conn.release();
  }
};

// Resend verification
exports.resendVerification = async (req, res) => {
  let conn;
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });

    conn = await db.getConnection();
    const users = await conn.query(
      `SELECT id, email_verified FROM users WHERE email = ?`,
      [email]
    );
    if (users.length === 0) return res.status(404).json({ error: 'User not found' });
    if (users[0].email_verified) return res.status(400).json({ error: 'Already verified' });

    const verificationToken = uuidv4();
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await conn.query(
      `UPDATE users SET verification_token = ?, token_expires = ? WHERE id = ?`,
      [verificationToken, tokenExpires, users[0].id]
    );

    const verifyUrl = `${APP_URL}/verify-email?token=${verificationToken}`;
    const subject = "Verify your email address";
    const text = `Please verify your email by clicking the link: ${verifyUrl}\n\nThis link will expire in 24 hours.`;
    // await sendEmail(email, subject, text); // Uncomment when ready

    res.json({ success: true, message: 'Verification email sent.' });
  } catch (err) {
    console.error('resendVerification error:', err);
    res.status(500).json({ error: 'Resend failed' });
  } finally {
    if (conn) conn.release();
  }
};

// Block login for unverified users
exports.loginUser = async (req, res) => {
  let conn;
  try {
    const { email, password } = req.body;
    conn = await db.getConnection();
    const users = await conn.query(
      `SELECT id, password, email_verified FROM users WHERE email = ?`,
      [email]
    );
    if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    // Check password (implement your hash check)
    if (!users[0].email_verified) {
      return res.status(403).json({ error: 'Please verify your email before logging in.' });
    }
    // Proceed with login/session/JWT logic...
    res.json({ success: true, userId: users[0].id });
  } catch (err) {
    console.error('loginUser error:', err);
    res.status(500).json({ error: 'Login failed' });
  } finally {
    if (conn) conn.release();
  }
};
