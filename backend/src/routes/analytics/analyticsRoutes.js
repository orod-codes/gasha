const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getRequestAnalytics,
  getTaskAnalytics,
  getUserAnalytics,
  getContentAnalytics,
  getSystemHealth
} = require('../../controllers/analytics/analyticsController');
const { authenticateToken, authorize } = require('../../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Dashboard analytics (all authenticated users)
router.get('/dashboard', getDashboardAnalytics);

// Request analytics (admin and marketing)
router.get('/requests', authorize('super-admin', 'admin', 'marketing'), getRequestAnalytics);

// Task analytics (admin and technical)
router.get('/tasks', authorize('super-admin', 'admin', 'technical'), getTaskAnalytics);

// User analytics (admin only)
router.get('/users', authorize('super-admin', 'admin'), getUserAnalytics);

// Content analytics (admin and marketing)
router.get('/content', authorize('super-admin', 'admin', 'marketing'), getContentAnalytics);

// System health (admin only)
router.get('/system', authorize('super-admin', 'admin'), getSystemHealth);

module.exports = router;
