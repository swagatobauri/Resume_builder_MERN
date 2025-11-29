const express = require('express');
const {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  resumePhotoUpload,
} = require('../controllers/resumeController');

const Resume = require('../models/Resume');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    advancedResults(Resume, {
      path: 'user',
      select: 'name email',
    }),
    getResumes
  )
  .post(protect, authorize('user', 'admin'), createResume);

router
  .route('/:id')
  .get(protect, getResume)
  .put(protect, authorize('user', 'admin'), updateResume)
  .delete(protect, authorize('user', 'admin'), deleteResume);

router
  .route('/:id/photo')
  .put(protect, authorize('user', 'admin'), resumePhotoUpload);

module.exports = router;
