const multer = require('multer');
const path = require('path');

// Store files locally on disk
// Intentional gap: local storage is not scalable — should use S3 or similar cloud storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Intentional gap: filename collision risk — two files with the same original name
    // uploaded at the same millisecond will overwrite each other
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// Intentional gap: NO fileFilter — accepts any MIME type including .exe, .sh, .php
// Intentional gap: NO file size limit — a malicious user can upload multi-GB files
const upload = multer({ storage });

module.exports = upload;
