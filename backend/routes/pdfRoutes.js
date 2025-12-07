const express = require('express');
const router = express.Router();
const { downloadResume } = require('../controllers/pdfController');
const { protect } = require('../middleware/authMiddleware');

router.get('/download/:resumeId', protect, downloadResume);

module.exports = router;
