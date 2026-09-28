const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  uploadResume,
  getResumeMetadata,
  deleteResume,
} = require('../controllers/resumeController');

const router = express.Router();

/**
 * Custom Multer error handling wrapper middleware
 */
const handleUploadMiddleware = (req, res, next) => {
  const singleUpload = upload.single('resume');
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload error',
      });
    }
    next();
  });
};

/**
 * @route   POST /api/resume/upload
 * @desc    Upload user's PDF/DOCX resume
 * @access  Private
 */
router.post('/upload', protect, handleUploadMiddleware, uploadResume);

/**
 * @route   GET /api/resume
 * @desc    Get user's uploaded resume metadata
 * @access  Private
 */
router.get('/', protect, getResumeMetadata);

/**
 * @route   DELETE /api/resume
 * @desc    Delete user's existing resume file
 * @access  Private
 */
router.delete('/', protect, deleteResume);

module.exports = router;
