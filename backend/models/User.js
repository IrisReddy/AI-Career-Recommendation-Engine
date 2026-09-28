const mongoose = require('mongoose');

// Sub-schema for structured education details
const EducationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      trim: true,
    },
    institution: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: Number,
    },
    grade: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

// Sub-schema for structured certification details
const CertificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    issuer: {
      type: String,
      trim: true,
    },
    issueYear: {
      type: Number,
    },
    credentialUrl: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

// Sub-schema for structured work experience details
const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: String,
      trim: true,
    },
    endDate: {
      type: String,
      trim: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

// Main User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    education: {
      type: [EducationSchema],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    certifications: {
      type: [CertificationSchema],
      default: [],
    },
    experience: {
      type: [ExperienceSchema],
      default: [],
    },
    // Reference/URL for uploaded resume file (stored on disk/S3, NOT as raw binary in DB)
    resumeUrl: {
      type: String,
      default: '',
    },
    resumeDetails: {
      originalName: { type: String, default: '' },
      storedName: { type: String, default: '' },
      filePath: { type: String, default: '' },
      fileType: { type: String, default: '' },
      fileSize: { type: Number, default: 0 },
      uploadedAt: { type: Date, default: null },
    },
    targetRole: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Hash password with bcryptjs before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance Method: Compare entered password with hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

