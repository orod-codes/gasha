const pool = require('../../config/database');

// Get all requests
const getAllRequests = async (req, res) => {
  try {
    const { status, priority, assignedTo, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT r.id, r.uuid, r.product_id, r.user_id, r.company_name, r.contact_person, 
             r.email, r.phone, r.status, r.priority, r.form_data, r.marketing_notes, 
             r.admin_notes, r.technical_notes, r.assigned_to, r.created_at, r.updated_at,
             p.name as product_name, p.category as product_category,
             u.name as assigned_user_name, u.email as assigned_user_email
      FROM requests r
      LEFT JOIN products p ON r.product_id = p.id
      LEFT JOIN users u ON r.assigned_to = u.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (status) {
      paramCount++;
      query += ` AND r.status = $${paramCount}`;
      params.push(status);
    }
    
    if (priority) {
      paramCount++;
      query += ` AND r.priority = $${paramCount}`;
      params.push(priority);
    }
    
    if (assignedTo) {
      paramCount++;
      query += ` AND r.assigned_to = $${paramCount}`;
      params.push(assignedTo);
    }
    
    query += ` ORDER BY r.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM requests r
      WHERE 1=1
    `;
    
    const countParams = [];
    let countParamCount = 0;
    
    if (status) {
      countParamCount++;
      countQuery += ` AND r.status = $${countParamCount}`;
      countParams.push(status);
    }
    
    if (priority) {
      countParamCount++;
      countQuery += ` AND r.priority = $${countParamCount}`;
      countParams.push(priority);
    }
    
    if (assignedTo) {
      countParamCount++;
      countQuery += ` AND r.assigned_to = $${countParamCount}`;
      countParams.push(assignedTo);
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
    console.error('Get requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch requests'
    });
  }
};

// Get request by ID
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT r.id, r.uuid, r.product_id, r.user_id, r.company_name, r.contact_person, 
              r.email, r.phone, r.status, r.priority, r.form_data, r.marketing_notes, 
              r.admin_notes, r.technical_notes, r.assigned_to, r.created_at, r.updated_at,
              p.name as product_name, p.category as product_category, p.description as product_description,
              u.name as assigned_user_name, u.email as assigned_user_email
       FROM requests r
       LEFT JOIN products p ON r.product_id = p.id
       LEFT JOIN users u ON r.assigned_to = u.id
       WHERE r.uuid = $1 OR r.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Get request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch request'
    });
  }
};

// Create request
const createRequest = async (req, res) => {
  try {
    const {
      productId,
      companyName,
      contactPerson,
      email,
      phone,
      formData
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO requests (product_id, company_name, contact_person, email, phone, form_data)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, uuid, product_id, company_name, contact_person, email, phone, 
                 status, priority, form_data, created_at`,
      [productId, companyName, contactPerson, email, phone, formData]
    );
    
    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create request'
    });
  }
};

// Update request status
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, assignedTo } = req.body;
    const userId = req.user.id;
    
    let updateFields = [];
    let params = [];
    let paramCount = 0;
    
    if (status) {
      paramCount++;
      updateFields.push(`status = $${paramCount}`);
      params.push(status);
    }
    
    if (notes) {
      paramCount++;
      updateFields.push(`admin_notes = $${paramCount}`);
      params.push(notes);
    }
    
    if (assignedTo) {
      paramCount++;
      updateFields.push(`assigned_to = $${paramCount}`);
      params.push(assignedTo);
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
      UPDATE requests 
      SET ${updateFields.join(', ')}
      WHERE uuid = $${paramCount} OR id = $${paramCount}
      RETURNING id, uuid, status, admin_notes, assigned_to, updated_at
    `;
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Request updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Update request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update request'
    });
  }
};

// Add marketing notes
const addMarketingNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    
    const result = await pool.query(
      `UPDATE requests 
       SET marketing_notes = $1, updated_at = CURRENT_TIMESTAMP
       WHERE uuid = $2 OR id = $2
       RETURNING id, uuid, marketing_notes, updated_at`,
      [notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Marketing notes added successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Add marketing notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add marketing notes'
    });
  }
};

// Add technical notes
const addTechnicalNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    
    const result = await pool.query(
      `UPDATE requests 
       SET technical_notes = $1, updated_at = CURRENT_TIMESTAMP
       WHERE uuid = $2 OR id = $2
       RETURNING id, uuid, technical_notes, updated_at`,
      [notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Technical notes added successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Add technical notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add technical notes'
    });
  }
};

// Get request statistics
const getRequestStats = async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_requests,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_requests,
        COUNT(CASE WHEN status = 'validated' THEN 1 END) as validated_requests,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_requests,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_requests,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_requests,
        COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_requests,
        COUNT(CASE WHEN priority = 'urgent' THEN 1 END) as urgent_requests
      FROM requests
    `);
    
    const statusStats = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM requests 
      GROUP BY status
      ORDER BY count DESC
    `);
    
    const priorityStats = await pool.query(`
      SELECT priority, COUNT(*) as count
      FROM requests 
      GROUP BY priority
      ORDER BY count DESC
    `);
    
    const recentRequests = await pool.query(`
      SELECT r.id, r.uuid, r.company_name, r.status, r.priority, r.created_at,
             p.name as product_name
      FROM requests r
      LEFT JOIN products p ON r.product_id = p.id
      ORDER BY r.created_at DESC
      LIMIT 10
    `);
    
    res.json({
      success: true,
      data: {
        overview: stats.rows[0],
        byStatus: statusStats.rows,
        byPriority: priorityStats.rows,
        recent: recentRequests.rows
      }
    });
    
  } catch (error) {
    console.error('Get request stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch request statistics'
    });
  }
};

// Delete request
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM requests WHERE uuid = $1 OR id = $1 RETURNING id, company_name',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Request deleted successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Delete request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete request'
    });
  }
};

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  addMarketingNotes,
  addTechnicalNotes,
  getRequestStats,
  deleteRequest
};
