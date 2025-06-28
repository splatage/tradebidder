const express = require('express');
const router = express.Router();
const {
  listNotifications,
  markAsRead,
  createNotification
} = require('../controllers/notificationController');

// List notifications for the current user
router.get('/', listNotifications);

// Mark a notification as read
router.put('/:id/read', markAsRead);

// Create a notification (for internal/testing use)
router.post('/', createNotification);

module.exports = router;
