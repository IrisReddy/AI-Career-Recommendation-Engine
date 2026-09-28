const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password, targetRole } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists',
      });
    }

    // 3. Create user (password automatically hashed by User Mongoose pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      targetRole: targetRole || '',
    });

    if (user) {
      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          targetRole: user.targetRole,
          skills: user.skills,
          interests: user.interests,
          createdAt: user.createdAt,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data provided',
      });
    }
  } catch (error) {
    console.error(`[Register Controller Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error during user registration',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & return JWT token
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    // 3. Check user existence and compare password
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'User authenticated successfully',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          targetRole: user.targetRole,
          skills: user.skills,
          interests: user.interests,
          createdAt: user.createdAt,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }
  } catch (error) {
    console.error(`[Login Controller Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error during user login',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get authenticated current user profile
 * @access  Private (Protected by JWT)
 */
const getMe = async (req, res) => {
  try {
    // req.user attached by protect middleware (password already excluded)
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(`[GetMe Controller Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching user profile',
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
