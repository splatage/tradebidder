const nodemailer = require('nodemailer');

// Use environment variables or config for secrets!
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com', // Change to your provider!
  port: process.env.SMTP_PORT || 465,              // 587 for TLS, 465 for SSL
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // Your SMTP login
    pass: process.env.SMTP_PASS  // Your SMTP password
  }
});

/**
 * Send an email
 * @param {string} to Recipient email address
 * @param {string} subject Email subject
 * @param {string} text Plaintext message body
 * @param {string} [html] Optional HTML message body
 */
async function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"TradeBidder" <noreply@yourdomain.com>',
    to,
    subject,
    text,
    ...(html ? { html } : {})
  };
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
