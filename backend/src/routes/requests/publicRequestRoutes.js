const express = require('express');
const {
  createRequest
} = require('../../controllers/requests/requestController');

const router = express.Router();

// Public route for creating requests (no authentication required)
router.post('/', createRequest);

module.exports = router;

