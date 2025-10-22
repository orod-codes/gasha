const express = require('express');
const { authenticateToken } = require('../../middleware/auth');
const { uploadFile, deleteFile } = require('../../controllers/upload/uploadController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Upload file
router.post('/', uploadFile);

// Delete file
router.delete('/:filename', deleteFile);

module.exports = router;

