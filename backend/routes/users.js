const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  suspendUser,
  verifyEmail,
  resendVerification,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.post('/suspend/:id', suspendUser);
router.get('/verify', verifyEmail);               // /api/users/verify?token=...
router.post('/resend-verification', resendVerification);

module.exports = router;
