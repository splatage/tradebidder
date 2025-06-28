const express = require('express');
const router = express.Router();
const {
  createPortfolioItem,
  listMyPortfolio,
  listUserPortfolio,
  updatePortfolioItem,
  deletePortfolioItem
} = require('../controllers/portfolioController');

// Create (auto/manual)
router.post('/', createPortfolioItem);

// List my portfolio (requires auth/user_id)
router.get('/', listMyPortfolio);

// Public: list user's public portfolio
router.get('/user/:userId', listUserPortfolio);

// Edit/approve/hide entry
router.put('/:id', updatePortfolioItem);

// Delete/hide entry (soft-delete)
router.delete('/:id', deletePortfolioItem);

module.exports = router;
