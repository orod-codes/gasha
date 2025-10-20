const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  completeTask,
  getTaskStats,
  deleteTask
} = require('../../controllers/tasks/taskController');
const { authenticateToken, authorize } = require('../../middleware/auth');
const { validateTask, validateId, validatePagination } = require('../../middleware/validation');

// All routes require authentication
router.use(authenticateToken);

// Get routes
router.get('/', validatePagination, getAllTasks);
router.get('/stats', getTaskStats);
router.get('/:id', validateId, getTaskById);

// Create task (admin and technical)
router.post('/', authorize('super-admin', 'admin', 'technical'), validateTask, createTask);

// Update task (assigned user, admin, technical)
router.put('/:id', validateId, updateTask);
router.put('/:id/complete', validateId, completeTask);

// Delete task (admin only)
router.delete('/:id', authorize('super-admin', 'admin'), validateId, deleteTask);

module.exports = router;
