const express = require('express');
const { authenticateToken } = require('../../middleware/auth');
const {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest
} = require('../../controllers/requests/requestController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all requests
router.get('/', getRequests);

// Get request by ID
router.get('/:id', getRequest);

// Create request
router.post('/', createRequest);

// Update request
router.put('/:id', updateRequest);

// Delete request
router.delete('/:id', deleteRequest);

module.exports = router;