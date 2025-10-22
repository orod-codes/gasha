const express = require('express');
const { authenticateToken } = require('../../middleware/auth');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../../controllers/tasks/taskController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all tasks
router.get('/', getTasks);

// Get task by ID
router.get('/:id', getTask);

// Create task
router.post('/', createTask);

// Update task
router.put('/:id', updateTask);

// Delete task
router.delete('/:id', deleteTask);

module.exports = router;