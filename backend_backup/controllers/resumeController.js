const Resume = require('../models/Resume');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all resumes
// @route   GET /api/v1/resumes
// @access  Private
exports.getResumes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single resume
// @route   GET /api/v1/resumes/:id
// @access  Private
exports.getResume = asyncHandler(async (req, res, next) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    return next(
      new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the resume or is an admin
  if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this resume`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: resume });
});

// @desc    Create new resume
// @route   POST /api/v1/resumes
// @access  Private
exports.createResume = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // If the user is not an admin, they can only add one resume
  if (req.user.role !== 'admin') {
    const publishedResume = await Resume.findOne({ user: req.user.id });
    if (publishedResume && !req.body.isDefault) {
      return next(
        new ErrorResponse(
          `The user with ID ${req.user.id} has already published a resume`,
          400
        )
      );
    }
  }

  const resume = await Resume.create(req.body);

  res.status(201).json({
    success: true,
    data: resume,
  });
});

// @desc    Update resume
// @route   PUT /api/v1/resumes/:id
// @access  Private
exports.updateResume = asyncHandler(async (req, res, next) => {
  let resume = await Resume.findById(req.params.id);

  if (!resume) {
    return next(
      new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the resume or is an admin
  if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this resume`,
        401
      )
    );
  }

  // If setting as default, update all other resumes to not be default
  if (req.body.isDefault) {
    await Resume.updateMany(
      { user: req.user.id, _id: { $ne: req.params.id } },
      { isDefault: false }
    );
  }

  resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: resume });
});

// @desc    Delete resume
// @route   DELETE /api/v1/resumes/:id
// @access  Private
exports.deleteResume = asyncHandler(async (req, res, next) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    return next(
      new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the resume or is an admin
  if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this resume`,
        401
      )
    );
  }

  await resume.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Upload photo for resume
// @route   PUT /api/v1/resumes/:id/photo
// @access  Private
exports.resumePhotoUpload = asyncHandler(async (req, res, next) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    return next(
      new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the resume or is an admin
  if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this resume`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${resume._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Resume.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
