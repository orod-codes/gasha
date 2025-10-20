const express = require('express');
const router = express.Router();
const {
  getUserNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification,
  getNotificationStats,
  bulkCreateNotifications
} = require('../../controllers/notifications/notificationController');
const { authenticateToken, authorize } = require('../../middleware/auth');
const { validateId, validatePagination } = require('../../middleware/validation');

// All routes require authentication
router.use(authenticateToken);

// User notification routes
router.get('/', validatePagination, getUserNotifications);
router.get('/stats', getNotificationStats);
router.get('/:id', validateId, getNotificationById);
router.put('/:id/read', validateId, markAsRead);
router.put('/all/read', markAllAsRead);
router.delete('/:id', validateId, deleteNotification);

// Admin only routes
router.post('/', authorize('super-admin', 'admin'), createNotification);
router.post('/bulk', authorize('super-admin', 'admin'), bulkCreateNotifications);

module.exports = router;
