const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
// const { protect } = require('../middleware/authMiddleware'); // Uncomment if auth is needed

// router.post('/analyze-resume', protect, aiController.analyzeResume);
router.post('/analyze-resume', aiController.analyzeResume);

module.exports = router;
