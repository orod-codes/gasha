const express = require('express');
const { body } = require('express-validator');
const { authenticateToken } = require('../../middleware/auth');
const {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  verifyToken
} = require('../../controllers/auth/authController');

const router = express.Router();

// Validation middleware
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('role')
    .isIn(['super-admin', 'admin', 'marketing', 'technical', 'developer'])
    .withMessage('Invalid role')
];

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
];

// Public routes
router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);

// Protected routes
router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, updateProfile);
router.put('/change-password', changePasswordValidation, changePassword);
router.post('/logout', logout);
router.get('/verify', verifyToken);

module.exports = router;