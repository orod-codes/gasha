const express = require('express');
const { authenticateToken, authorize } = require('../../middleware/auth');
const {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule
} = require('../../controllers/modules/moduleController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all modules (all authenticated users can view)
router.get('/', getModules);

// Get module by ID (all authenticated users can view)
router.get('/:id', getModule);

// Create module (super-admin only)
router.post('/', authorize('super-admin'), createModule);

// Update module (super-admin only)
router.put('/:id', authorize('super-admin'), updateModule);

// Delete module (super-admin only)
router.delete('/:id', authorize('super-admin'), deleteModule);

module.exports = router;


