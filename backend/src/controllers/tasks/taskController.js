const pool = require('../../config/database');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const { status, priority, assignedTo, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT t.id, t.uuid, t.request_id, t.title, t.description, t.task_type, 
             t.status, t.priority, t.assigned_to, t.requirements, t.notes, 
             t.progress, t.due_date, t.completed_at, t.created_at, t.updated_at,
             r.company_name, r.contact_person, r.email as company_email,
             p.name as product_name, p.category as product_category,
             u.name as assigned_user_name, u.email as assigned_user_email
      FROM tasks t
      LEFT JOIN requests r ON t.request_id = r.id
      LEFT JOIN products p ON r.product_id = p.id
      LEFT JOIN users u ON t.assigned_to = u.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (status) {
      paramCount++;
      query += ` AND t.status = $${paramCount}`;
      params.push(status);
    }
    
    if (priority) {
      paramCount++;
      query += ` AND t.priority = $${paramCount}`;
      params.push(priority);
    }
    
    if (assignedTo) {
      paramCount++;
      query += ` AND t.assigned_to = $${paramCount}`;
      params.push(assignedTo);
    }
    
    query += ` ORDER BY t.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM tasks t
      WHERE 1=1
    `;
    
    const countParams = [];
    let countParamCount = 0;
    
    if (status) {
      countParamCount++;
      countQuery += ` AND t.status = $${countParamCount}`;
      countParams.push(status);
    }
    
    if (priority) {
      countParamCount++;
      countQuery += ` AND t.priority = $${countParamCount}`;
      countParams.push(priority);
    }
    
    if (assignedTo) {
      countParamCount++;
      countQuery += ` AND t.assigned_to = $${countParamCount}`;
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
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks'
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT t.id, t.uuid, t.request_id, t.title, t.description, t.task_type, 
              t.status, t.priority, t.assigned_to, t.requirements, t.notes, 
              t.progress, t.due_date, t.completed_at, t.created_at, t.updated_at,
              r.company_name, r.contact_person, r.email as company_email,
              p.name as product_name, p.category as product_category,
              u.name as assigned_user_name, u.email as assigned_user_email
       FROM tasks t
       LEFT JOIN requests r ON t.request_id = r.id
       LEFT JOIN products p ON r.product_id = p.id
       LEFT JOIN users u ON t.assigned_to = u.id
       WHERE t.uuid = $1 OR t.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task'
    });
  }
};

// Create task
const createTask = async (req, res) => {
  try {
    const {
      requestId,
      title,
      description,
      taskType,
      priority,
      assignedTo,
      requirements,
      notes,
      dueDate
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO tasks (request_id, title, description, task_type, priority, 
                         assigned_to, requirements, notes, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, uuid, request_id, title, description, task_type, 
                 status, priority, assigned_to, requirements, notes, 
                 progress, due_date, created_at`,
      [requestId, title, description, taskType, priority, assignedTo, requirements, notes, dueDate]
    );
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task'
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      taskType,
      status,
      priority,
      assignedTo,
      requirements,
      notes,
      progress,
      dueDate
    } = req.body;
    
    let updateFields = [];
    let params = [];
    let paramCount = 0;
    
    if (title) {
      paramCount++;
      updateFields.push(`title = $${paramCount}`);
      params.push(title);
    }
    
    if (description) {
      paramCount++;
      updateFields.push(`description = $${paramCount}`);
      params.push(description);
    }
    
    if (taskType) {
      paramCount++;
      updateFields.push(`task_type = $${paramCount}`);
      params.push(taskType);
    }
    
    if (status) {
      paramCount++;
      updateFields.push(`status = $${paramCount}`);
      params.push(status);
    }
    
    if (priority) {
      paramCount++;
      updateFields.push(`priority = $${paramCount}`);
      params.push(priority);
    }
    
    if (assignedTo) {
      paramCount++;
      updateFields.push(`assigned_to = $${paramCount}`);
      params.push(assignedTo);
    }
    
    if (requirements) {
      paramCount++;
      updateFields.push(`requirements = $${paramCount}`);
      params.push(requirements);
    }
    
    if (notes) {
      paramCount++;
      updateFields.push(`notes = $${paramCount}`);
      params.push(notes);
    }
    
    if (progress !== undefined) {
      paramCount++;
      updateFields.push(`progress = $${paramCount}`);
      params.push(progress);
    }
    
    if (dueDate) {
      paramCount++;
      updateFields.push(`due_date = $${paramCount}`);
      params.push(dueDate);
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
      UPDATE tasks 
      SET ${updateFields.join(', ')}
      WHERE uuid = $${paramCount} OR id = $${paramCount}
      RETURNING id, uuid, title, description, task_type, status, priority, 
                assigned_to, requirements, notes, progress, due_date, 
                completed_at, updated_at
    `;
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task'
    });
  }
};

// Complete task
const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    
    const result = await pool.query(
      `UPDATE tasks 
       SET status = 'completed', 
           progress = 100, 
           completed_at = CURRENT_TIMESTAMP,
           notes = COALESCE($1, notes),
           updated_at = CURRENT_TIMESTAMP
       WHERE uuid = $2 OR id = $2
       RETURNING id, uuid, status, progress, completed_at, notes`,
      [notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task completed successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete task'
    });
  }
};

// Get task statistics
const getTaskStats = async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_tasks,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_tasks,
        COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_tasks,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
        COUNT(CASE WHEN status = 'on-hold' THEN 1 END) as on_hold_tasks,
        COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_tasks,
        COUNT(CASE WHEN priority = 'urgent' THEN 1 END) as urgent_tasks,
        AVG(progress) as average_progress
      FROM tasks
    `);
    
    const statusStats = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM tasks 
      GROUP BY status
      ORDER BY count DESC
    `);
    
    const priorityStats = await pool.query(`
      SELECT priority, COUNT(*) as count
      FROM tasks 
      GROUP BY priority
      ORDER BY count DESC
    `);
    
    const overdueTasks = await pool.query(`
      SELECT COUNT(*) as count
      FROM tasks 
      WHERE due_date < CURRENT_TIMESTAMP 
      AND status NOT IN ('completed', 'cancelled')
    `);
    
    res.json({
      success: true,
      data: {
        overview: stats.rows[0],
        byStatus: statusStats.rows,
        byPriority: priorityStats.rows,
        overdue: overdueTasks.rows[0]
      }
    });
    
  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task statistics'
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM tasks WHERE uuid = $1 OR id = $1 RETURNING id, title',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task'
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  completeTask,
  getTaskStats,
  deleteTask
};
