const express = require('express');
const User = require('../models/User');

const router = express.Router();

/**
 * @route   GET /api/test/user-schema
 * @desc    Test endpoint to verify User model loading and schema field validation
 * @access  Public
 */
router.get('/user-schema', (req, res) => {
  try {
    // Instantiate a dummy instance in memory to validate Schema definition
    const dummyUser = new User({
      name: 'Test Student',
      email: 'student@example.com',
      password: 'dummyPassword123',
      education: [
        {
          degree: 'B.Tech',
          fieldOfStudy: 'Computer Science and Engineering',
          institution: 'Apex Institute of Technology',
          graduationYear: 2026,
        },
      ],
      skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning'],
      interests: ['Artificial Intelligence', 'Full Stack Development', 'NLP'],
      certifications: [
        {
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          issueYear: 2025,
        },
      ],
      experience: [
        {
          title: 'Software Development Intern',
          company: 'Tech Solutions Inc',
          startDate: '2025-05',
          endDate: '2025-08',
          description: 'Developed RESTful API endpoints and integrated UI components.',
        },
      ],
    });

    // Validate dummy user schema rules
    const validationError = dummyUser.validateSync();

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: 'Schema validation failed',
        errors: validationError.errors,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User model loaded and schema validated successfully',
      modelName: User.modelName,
      schemaPaths: Object.keys(User.schema.paths),
      sampleUserObject: {
        name: dummyUser.name,
        email: dummyUser.email,
        skillsCount: dummyUser.skills.length,
        interestsCount: dummyUser.interests.length,
        educationCount: dummyUser.education.length,
        certificationsCount: dummyUser.certifications.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to test User model',
      error: error.message,
    });
  }
});

module.exports = router;
