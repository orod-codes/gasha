const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  publishContent,
  archiveContent,
  deleteContent,
  getContentStats,
  searchContent
} = require('../../controllers/content/contentController');
const { authenticateToken, authorize } = require('../../middleware/auth');
const { validateContent, validateId, validatePagination, validateSearch } = require('../../middleware/validation');

// Public routes
router.get('/search', validateSearch, searchContent);

// Protected routes
router.use(authenticateToken);

router.get('/', validatePagination, getAllContent);
router.get('/stats', getContentStats);
router.get('/:id', validateId, getContentById);

// Content creation and management (marketing, admin)
router.post('/', authorize('marketing', 'admin', 'super-admin'), validateContent, createContent);
router.put('/:id', validateId, updateContent);
router.put('/:id/publish', validateId, publishContent);
router.put('/:id/archive', validateId, archiveContent);

// Delete content (admin only)
router.delete('/:id', authorize('admin', 'super-admin'), validateId, deleteContent);

module.exports = router;
