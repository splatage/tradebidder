const express = require('express');
const router = express.Router();
const {
  submitReview,
  getReviewById,
  flagReview,
  moderateReview
} = require('../controllers/reviewController');

router.post('/', submitReview);
router.get('/:id', getReviewById);
router.post('/flag/:id', flagReview);
router.post('/moderate/:id', moderateReview);

module.exports = router;