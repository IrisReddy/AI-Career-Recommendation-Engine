const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure destination upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const userId = req.user ? req.user._id : 'anonymous';
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueFilename = `resume-${userId}-${Date.now()}${ext}`;
    cb(null, uniqueFilename);
  },
});

// File Validation Filter (PDF & DOCX only)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.docx'];
  const allowedMimetypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ];

  const ext = path.extname(file.originalname).toLowerCase();
  const isExtensionAllowed = allowedExtensions.includes(ext);
  const isMimetypeAllowed = allowedMimetypes.includes(file.mimetype);

  if (isExtensionAllowed && isMimetypeAllowed) {
    return cb(null, true);
  } else {
    return cb(
      new Error('Invalid file format. Only PDF (.pdf) and Word (.docx) documents are allowed.'),
      false
    );
  }
};

// Multer Upload Instance with 10MB limit
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB Max File Size
  },
  fileFilter: fileFilter,
});

module.exports = upload;
