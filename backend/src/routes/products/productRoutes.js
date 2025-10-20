const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByModule,
  getProductStats
} = require('../../controllers/products/productController');
const { authenticateToken, authorize } = require('../../middleware/auth');
const { validateProduct, validateId, validatePagination } = require('../../middleware/validation');

// Public routes
router.get('/', validatePagination, getAllProducts);
router.get('/stats', getProductStats);
router.get('/category/:category', getProductsByCategory);
router.get('/module/:module', getProductsByModule);
router.get('/:id', validateId, getProductById);

// Protected routes (admin only)
router.use(authenticateToken);
router.use(authorize('super-admin', 'admin'));

router.post('/', validateProduct, createProduct);
router.put('/:id', validateId, updateProduct);
router.delete('/:id', validateId, deleteProduct);

module.exports = router;
