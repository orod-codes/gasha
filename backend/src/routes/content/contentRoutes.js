const express = require('express');
const { authenticateToken } = require('../../middleware/auth');
const {
  getContent,
  getContentItem,
  createContent,
  updateContent,
  deleteContent
} = require('../../controllers/content/contentController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all content
router.get('/', getContent);

// Get content by ID
router.get('/:id', getContentItem);

// Create content
router.post('/', createContent);

// Update content
router.put('/:id', updateContent);

// Delete content
router.delete('/:id', deleteContent);

module.exports = router;