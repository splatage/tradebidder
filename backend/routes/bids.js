const express = require('express');
const router = express.Router();
const {
  placeBid,
  getBidById
} = require('../controllers/bidController');

router.post('/', placeBid);
router.get('/:id', getBidById);

module.exports = router;