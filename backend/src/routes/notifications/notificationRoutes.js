const express = require('express');
const { authenticateToken } = require('../../middleware/auth');
const {
  getNotifications,
  getNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  createNotification,
  deleteNotification
} = require('../../controllers/notifications/notificationController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all notifications for current user
router.get('/', getNotifications);

// Get notification by ID
router.get('/:id', getNotification);

// Mark notification as read
router.put('/:id/read', markNotificationAsRead);

// Mark all notifications as read
router.put('/read-all', markAllNotificationsAsRead);

// Create notification
router.post('/', createNotification);

// Delete notification
router.delete('/:id', deleteNotification);

module.exports = router;