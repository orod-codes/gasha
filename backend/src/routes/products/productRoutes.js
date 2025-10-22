const express = require('express');
const { authenticateToken, authorize } = require('../../middleware/auth');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../../controllers/products/productController');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (require authentication)
router.use(authenticateToken);

// Admin and Super Admin only routes
router.post('/', authorize('admin', 'super-admin'), createProduct);
router.put('/:id', authorize('admin', 'super-admin'), updateProduct);
router.delete('/:id', authorize('admin', 'super-admin'), deleteProduct);

module.exports = router;