const express = require('express');
const router = express.Router();
const { enhanceProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.post('/enhance', protect, enhanceProfile);

module.exports = router;
