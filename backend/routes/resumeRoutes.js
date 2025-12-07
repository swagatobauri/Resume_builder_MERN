const express = require('express');
const router = express.Router();
const {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
    generatePDF,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.post('/', protect, createResume);
router.get('/:userId', protect, getUserResumes);
router.get('/single/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.delete('/:id', protect, deleteResume);
router.post('/generate-pdf', protect, generatePDF);

module.exports = router;
