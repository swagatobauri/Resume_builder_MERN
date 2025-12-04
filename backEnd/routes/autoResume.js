const express = require('express');
const router = express.Router();
const autoResumeController = require('../controllers/autoResumeController');
const auth = require('../middleware/auth'); // Assuming you have authentication middleware

// @route   POST /api/auto-resume
// @desc    Generate resume from GitHub and portfolio
// @access  Private (assuming you want this protected)
router.post('/', auth, autoResumeController.generateResume);

module.exports = router;