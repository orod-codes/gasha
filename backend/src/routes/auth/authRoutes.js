const express = require('express');
const router = express.Router();
const {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  verifyToken
} = require('../../controllers/auth/authController');
const { authenticateToken, authorize } = require('../../middleware/auth');
const { validateLogin, validateUser } = require('../../middleware/validation');

// Public routes
router.post('/login', validateLogin, login);
router.post('/logout', logout);

// Protected routes
router.use(authenticateToken); // All routes below require authentication

router.get('/profile', getProfile);
router.get('/verify', verifyToken);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

// Admin only routes
router.post('/register', authorize('super-admin', 'admin'), validateUser, register);

module.exports = router;
