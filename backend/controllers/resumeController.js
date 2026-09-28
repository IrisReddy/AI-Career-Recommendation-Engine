const fs = require('fs');
const path = require('path');
const User = require('../models/User');

/**
 * @route   POST /api/resume/upload
 * @desc    Upload or replace user's resume file (PDF or DOCX)
 * @access  Private (Authenticated)
 */
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select a PDF or DOCX resume file to upload',
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(444).json({
        success: false,
        message: 'Authenticated user not found',
      });
    }

    // Clean up old physical file if user previously uploaded a resume
    if (user.resumeDetails && user.resumeDetails.filePath) {
      try {
        if (fs.existsSync(user.resumeDetails.filePath)) {
          fs.unlinkSync(user.resumeDetails.filePath);
          console.log(`[Resume Clean] Deleted old resume file: ${user.resumeDetails.filePath}`);
        }
      } catch (cleanupErr) {
        console.warn(`[Resume Clean Warning] Could not remove old file: ${cleanupErr.message}`);
      }
    }

    const relativeUrl = `/uploads/resumes/${req.file.filename}`;
    const resumeMetadata = {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedAt: new Date(),
    };

    user.resumeUrl = relativeUrl;
    user.resumeDetails = resumeMetadata;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Resume uploaded and stored successfully',
      resumeUrl: relativeUrl,
      resumeDetails: user.resumeDetails,
    });
  } catch (error) {
    console.error(`[Resume Upload Controller Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error during resume file upload',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/resume
 * @desc    Get authenticated user's uploaded resume metadata
 * @access  Private (Authenticated)
 */
const getResumeMetadata = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('resumeUrl resumeDetails');

    if (!user || !user.resumeDetails || !user.resumeDetails.storedName) {
      return res.status(200).json({
        success: true,
        hasResume: false,
        resumeUrl: null,
        resumeDetails: null,
      });
    }

    return res.status(200).json({
      success: true,
      hasResume: true,
      resumeUrl: user.resumeUrl,
      resumeDetails: user.resumeDetails,
    });
  } catch (error) {
    console.error(`[Get Resume Metadata Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving resume metadata',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/resume
 * @desc    Delete existing resume file & metadata for authenticated user
 * @access  Private (Authenticated)
 */
const deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.resumeDetails || !user.resumeDetails.storedName) {
      return res.status(400).json({
        success: false,
        message: 'No resume file associated with this user to delete',
      });
    }

    // Delete physical file from disk
    if (user.resumeDetails.filePath && fs.existsSync(user.resumeDetails.filePath)) {
      try {
        fs.unlinkSync(user.resumeDetails.filePath);
      } catch (fileErr) {
        console.warn(`[Delete Resume File Error] ${fileErr.message}`);
      }
    }

    // Reset User fields
    user.resumeUrl = '';
    user.resumeDetails = {
      originalName: '',
      storedName: '',
      filePath: '',
      fileType: '',
      fileSize: 0,
      uploadedAt: null,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Resume file deleted successfully',
    });
  } catch (error) {
    console.error(`[Delete Resume Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error deleting resume',
      error: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getResumeMetadata,
  deleteResume,
};
