const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  suspendUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.post('/suspend/:id', suspendUser);

module.exports = router;