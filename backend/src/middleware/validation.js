const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUser = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('role')
    .isIn(['super-admin', 'admin', 'marketing', 'technical', 'developer'])
    .withMessage('Invalid role'),
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Product validation
const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Product name must be between 2 and 255 characters'),
  body('category')
    .isIn(['gasha', 'nisir', 'enyuma', 'codepro', 'biometrics'])
    .withMessage('Invalid category'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('module')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Module must be between 2 and 100 characters'),
  handleValidationErrors
];

// Request validation
const validateRequest = [
  body('productId')
    .isInt({ min: 1 })
    .withMessage('Valid product ID is required'),
  body('companyName')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Company name must be between 2 and 255 characters'),
  body('contactPerson')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Contact person name must be between 2 and 255 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  handleValidationErrors
];

// Task validation
const validateTask = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('Task title must be between 5 and 255 characters'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Task description must be at least 10 characters'),
  body('taskType')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Task type must be between 2 and 50 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority level'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Valid due date is required'),
  handleValidationErrors
];

// Content validation
const validateContent = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('Content title must be between 5 and 255 characters'),
  body('content')
    .trim()
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('type')
    .isIn(['blog', 'news', 'documentation', 'announcement'])
    .withMessage('Invalid content type'),
  body('scope')
    .optional()
    .isIn(['global', 'module'])
    .withMessage('Invalid scope'),
  handleValidationErrors
];

// ID parameter validation
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid ID is required'),
  handleValidationErrors
];

// UUID parameter validation
const validateUuid = [
  param('uuid')
    .isUUID()
    .withMessage('Valid UUID is required'),
  handleValidationErrors
];

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

// Search validation
const validateSearch = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUser,
  validateLogin,
  validateProduct,
  validateRequest,
  validateTask,
  validateContent,
  validateId,
  validateUuid,
  validatePagination,
  validateSearch
};
