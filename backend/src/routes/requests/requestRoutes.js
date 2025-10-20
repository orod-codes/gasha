const express = require('express');
const router = express.Router();
const {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  addMarketingNotes,
  addTechnicalNotes,
  getRequestStats,
  deleteRequest
} = require('../../controllers/requests/requestController');
const { authenticateToken, authorize } = require('../../middleware/auth');
const { validateRequest, validateId, validatePagination } = require('../../middleware/validation');

// Public routes
router.post('/', validateRequest, createRequest);

// Protected routes
router.use(authenticateToken);

router.get('/', validatePagination, getAllRequests);
router.get('/stats', getRequestStats);
router.get('/:id', validateId, getRequestById);

// Admin and marketing routes
router.put('/:id/status', authorize('super-admin', 'admin'), updateRequestStatus);
router.put('/:id/marketing-notes', authorize('marketing', 'admin', 'super-admin'), addMarketingNotes);
router.put('/:id/technical-notes', authorize('technical', 'admin', 'super-admin'), addTechnicalNotes);

// Admin only routes
router.delete('/:id', authorize('super-admin', 'admin'), validateId, deleteRequest);

module.exports = router;
