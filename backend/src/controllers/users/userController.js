const bcrypt = require('bcryptjs');
const pool = require('../../config/database');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { role, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT id, uuid, email, name, role, module, status, last_login, created_at, updated_at
      FROM users
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (role) {
      paramCount++;
      query += ` AND role = $${paramCount}`;
      params.push(role);
    }
    
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM users
      WHERE 1=1
    `;
    
    const countParams = [];
    let countParamCount = 0;
    
    if (role) {
      countParamCount++;
      countQuery += ` AND role = $${countParamCount}`;
      countParams.push(role);
    }
    
    if (status) {
      countParamCount++;
      countQuery += ` AND status = $${countParamCount}`;
      countParams.push(status);
    }
    
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);
    
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT id, uuid, email, name, role, module, status, last_login, created_at, updated_at
       FROM users 
       WHERE uuid = $1 OR id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const { email, password, name, role, module } = req.body;
    
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }
    
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, module, status)
       VALUES ($1, $2, $3, $4, $5, 'active')
       RETURNING id, uuid, email, name, role, module, status, created_at`,
      [email.toLowerCase(), passwordHash, name, role, module]
    );
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, role, module, status } = req.body;
    
    // Check if email is already taken by another user
    if (email) {
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1 AND id != (SELECT id FROM users WHERE uuid = $2 OR id = $2)',
        [email.toLowerCase(), id]
      );
      
      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email already taken'
        });
      }
    }
    
    let updateFields = [];
    let params = [];
    let paramCount = 0;
    
    if (email) {
      paramCount++;
      updateFields.push(`email = $${paramCount}`);
      params.push(email.toLowerCase());
    }
    
    if (name) {
      paramCount++;
      updateFields.push(`name = $${paramCount}`);
      params.push(name);
    }
    
    if (role) {
      paramCount++;
      updateFields.push(`role = $${paramCount}`);
      params.push(role);
    }
    
    if (module) {
      paramCount++;
      updateFields.push(`module = $${paramCount}`);
      params.push(module);
    }
    
    if (status) {
      paramCount++;
      updateFields.push(`status = $${paramCount}`);
      params.push(status);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    paramCount++;
    params.push(id);
    
    const query = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE uuid = $${paramCount} OR id = $${paramCount}
      RETURNING id, uuid, email, name, role, module, status, updated_at
    `;
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM users WHERE uuid = $1 OR id = $1 RETURNING id, email, name',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
};

// Toggle user status
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `UPDATE users 
       SET status = CASE 
         WHEN status = 'active' THEN 'inactive'
         ELSE 'active'
       END,
       updated_at = CURRENT_TIMESTAMP
       WHERE uuid = $1 OR id = $1
       RETURNING id, uuid, email, name, status, updated_at`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: `User ${result.rows[0].status === 'active' ? 'activated' : 'deactivated'} successfully`,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle user status'
    });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
        COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_users,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_users,
        COUNT(CASE WHEN last_login >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as recent_logins
      FROM users
    `);
    
    const roleStats = await pool.query(`
      SELECT role, COUNT(*) as count
      FROM users 
      WHERE status = 'active'
      GROUP BY role
      ORDER BY count DESC
    `);
    
    const moduleStats = await pool.query(`
      SELECT module, COUNT(*) as count
      FROM users 
      WHERE status = 'active' AND module IS NOT NULL
      GROUP BY module
      ORDER BY count DESC
    `);
    
    const recentUsers = await pool.query(`
      SELECT id, uuid, email, name, role, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 10
    `);
    
    res.json({
      success: true,
      data: {
        overview: stats.rows[0],
        byRole: roleStats.rows,
        byModule: moduleStats.rows,
        recent: recentUsers.rows
      }
    });
    
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics'
    });
  }
};

// Reset user password
const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    
    // Hash new password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    
    const result = await pool.query(
      `UPDATE users 
       SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
       WHERE uuid = $2 OR id = $2
       RETURNING id, uuid, email, name`,
      [passwordHash, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Password reset successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Reset user password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset user password'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserStats,
  resetUserPassword
};
