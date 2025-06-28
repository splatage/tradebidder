const express = require('express');
const router = express.Router();
const {
  placeBid,
  getBidById,
  getAcceptedBids      // <-- Add this import
} = require('../controllers/bidController');

router.post('/', placeBid);
router.get('/accepted', getAcceptedBids);  // <-- Add this line
router.get('/:id', getBidById);

module.exports = router;
