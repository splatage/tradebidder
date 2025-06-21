const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  postJob,
  completeJob
} = require('../controllers/jobController');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', postJob);
router.post('/:id/complete', completeJob);

module.exports = router;