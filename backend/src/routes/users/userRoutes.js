const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserStats,
  resetUserPassword
} = require('../../controllers/users/userController');
const { authenticateToken, authorize } = require('../../middleware/auth');
const { validateUser, validateId, validatePagination } = require('../../middleware/validation');

// All routes require authentication
router.use(authenticateToken);

// Get routes
router.get('/', validatePagination, getAllUsers);
router.get('/stats', getUserStats);
router.get('/:id', validateId, getUserById);

// Admin only routes
router.use(authorize('super-admin', 'admin'));

router.post('/', validateUser, createUser);
router.put('/:id', validateId, updateUser);
router.delete('/:id', validateId, deleteUser);
router.put('/:id/toggle-status', validateId, toggleUserStatus);
router.put('/:id/reset-password', validateId, resetUserPassword);

module.exports = router;
