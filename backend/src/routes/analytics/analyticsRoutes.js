const express = require('express');
const { authenticateToken } = require('../../middleware/auth');
const {
  getAnalytics,
  getAnalyticsByModule,
  createAnalytics,
  getAnalyticsSummary
} = require('../../controllers/analytics/analyticsController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all analytics
router.get('/', getAnalytics);

// Get analytics summary
router.get('/summary', getAnalyticsSummary);

// Get analytics by module
router.get('/module/:module', getAnalyticsByModule);

// Create analytics record
router.post('/', createAnalytics);

module.exports = router;