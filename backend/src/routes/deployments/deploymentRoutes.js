const express = require('express');
const { authenticateToken } = require('../../middleware/auth');
const {
  getDeployments,
  getDeployment,
  createDeployment,
  updateDeployment,
  deleteDeployment
} = require('../../controllers/deployments/deploymentController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all deployments
router.get('/', getDeployments);

// Get deployment by ID
router.get('/:id', getDeployment);

// Create deployment
router.post('/', createDeployment);

// Update deployment
router.put('/:id', updateDeployment);

// Delete deployment
router.delete('/:id', deleteDeployment);

module.exports = router;