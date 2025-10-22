const express = require('express');
const { authenticateToken, authorize } = require('../../middleware/auth');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addUserModule,
  removeUserModule,
  getUsersByModule
} = require('../../controllers/users/userController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all users (admin and super-admin only)
router.get('/', authorize('admin', 'super-admin'), getUsers);

// Get user by ID
router.get('/:id', getUser);

// Create user (admin and super-admin only)
router.post('/', authorize('admin', 'super-admin'), createUser);

// Update user
router.put('/:id', updateUser);

// Delete user (super-admin only)
router.delete('/:id', authorize('super-admin'), deleteUser);

// Module management routes (admin and super-admin only)
router.post('/:id/modules', authorize('admin', 'super-admin'), addUserModule);
router.delete('/:id/modules', authorize('admin', 'super-admin'), removeUserModule);

// Get users by module
router.get('/module/:module', authorize('admin', 'super-admin'), getUsersByModule);

module.exports = router;