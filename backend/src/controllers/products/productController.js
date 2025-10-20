const pool = require('../../config/database');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category, module, status } = req.query;
    
    let query = `
      SELECT id, uuid, name, category, description, features, module, 
             has_download, has_request, has_show_products, status, 
             created_at, updated_at
      FROM products
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }
    
    if (module) {
      paramCount++;
      query += ` AND module = $${paramCount}`;
      params.push(module);
    }
    
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
    
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT id, uuid, name, category, description, features, module, 
              has_download, has_request, has_show_products, status, 
              created_at, updated_at
       FROM products 
       WHERE uuid = $1 OR id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
};

// Create product (admin only)
const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      features,
      module,
      hasDownload,
      hasRequest,
      hasShowProducts
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO products (name, category, description, features, module, 
                            has_download, has_request, has_show_products)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, uuid, name, category, description, features, module, 
                 has_download, has_request, has_show_products, status, 
                 created_at, updated_at`,
      [name, category, description, features, module, hasDownload, hasRequest, hasShowProducts]
    );
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
};

// Update product (admin only)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      description,
      features,
      module,
      hasDownload,
      hasRequest,
      hasShowProducts,
      status
    } = req.body;
    
    const result = await pool.query(
      `UPDATE products 
       SET name = COALESCE($1, name),
           category = COALESCE($2, category),
           description = COALESCE($3, description),
           features = COALESCE($4, features),
           module = COALESCE($5, module),
           has_download = COALESCE($6, has_download),
           has_request = COALESCE($7, has_request),
           has_show_products = COALESCE($8, has_show_products),
           status = COALESCE($9, status),
           updated_at = CURRENT_TIMESTAMP
       WHERE uuid = $10 OR id = $10
       RETURNING id, uuid, name, category, description, features, module, 
                 has_download, has_request, has_show_products, status, 
                 created_at, updated_at`,
      [name, category, description, features, module, hasDownload, hasRequest, hasShowProducts, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM products WHERE uuid = $1 OR id = $1 RETURNING id, name',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const result = await pool.query(
      `SELECT id, uuid, name, category, description, features, module, 
              has_download, has_request, has_show_products, status, 
              created_at, updated_at
       FROM products 
       WHERE category = $1 AND status = 'active'
       ORDER BY created_at DESC`,
      [category]
    );
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
    
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products by category'
    });
  }
};

// Get products by module
const getProductsByModule = async (req, res) => {
  try {
    const { module } = req.params;
    
    const result = await pool.query(
      `SELECT id, uuid, name, category, description, features, module, 
              has_download, has_request, has_show_products, status, 
              created_at, updated_at
       FROM products 
       WHERE module = $1 AND status = 'active'
       ORDER BY created_at DESC`,
      [module]
    );
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
    
  } catch (error) {
    console.error('Get products by module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products by module'
    });
  }
};

// Get product statistics
const getProductStats = async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_products,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_products,
        COUNT(CASE WHEN has_download = true THEN 1 END) as downloadable_products,
        COUNT(CASE WHEN has_request = true THEN 1 END) as requestable_products,
        COUNT(DISTINCT category) as categories_count,
        COUNT(DISTINCT module) as modules_count
      FROM products
    `);
    
    const categoryStats = await pool.query(`
      SELECT category, COUNT(*) as count
      FROM products 
      WHERE status = 'active'
      GROUP BY category
      ORDER BY count DESC
    `);
    
    const moduleStats = await pool.query(`
      SELECT module, COUNT(*) as count
      FROM products 
      WHERE status = 'active'
      GROUP BY module
      ORDER BY count DESC
    `);
    
    res.json({
      success: true,
      data: {
        overview: stats.rows[0],
        byCategory: categoryStats.rows,
        byModule: moduleStats.rows
      }
    });
    
  } catch (error) {
    console.error('Get product stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product statistics'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByModule,
  getProductStats
};
