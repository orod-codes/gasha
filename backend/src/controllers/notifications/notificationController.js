const pool = require('../../config/database');

// Get user notifications
const getUserNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, isRead } = req.query;
    const offset = (page - 1) * limit;
    const userId = req.user.id;
    
    let query = `
      SELECT id, uuid, title, message, type, is_read, action_url, 
             metadata, expires_at, created_at
      FROM notifications
      WHERE user_id = $1
    `;
    
    const params = [userId];
    let paramCount = 1;
    
    if (isRead !== undefined) {
      paramCount++;
      query += ` AND is_read = $${paramCount}`;
      params.push(isRead === 'true');
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM notifications
      WHERE user_id = $1
    `;
    
    const countParams = [userId];
    let countParamCount = 1;
    
    if (isRead !== undefined) {
      countParamCount++;
      countQuery += ` AND is_read = $${countParamCount}`;
      countParams.push(isRead === 'true');
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
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
};

// Get notification by ID
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const result = await pool.query(
      `SELECT id, uuid, title, message, type, is_read, action_url, 
              metadata, expires_at, created_at
       FROM notifications
       WHERE (uuid = $1 OR id = $1) AND user_id = $2`,
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Get notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification'
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const result = await pool.query(
      `UPDATE notifications 
       SET is_read = true, updated_at = CURRENT_TIMESTAMP
       WHERE (uuid = $1 OR id = $1) AND user_id = $2
       RETURNING id, uuid, is_read, updated_at`,
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Notification marked as read',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read'
    });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await pool.query(
      `UPDATE notifications 
       SET is_read = true, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1 AND is_read = false
       RETURNING COUNT(*) as updated_count`,
      [userId]
    );
    
    res.json({
      success: true,
      message: 'All notifications marked as read',
      data: {
        updatedCount: result.rows[0].updated_count
      }
    });
    
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read'
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const result = await pool.query(
      `DELETE FROM notifications 
       WHERE (uuid = $1 OR id = $1) AND user_id = $2
       RETURNING id, uuid, title`,
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Notification deleted successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification'
    });
  }
};

// Create notification (admin only)
const createNotification = async (req, res) => {
  try {
    const {
      userId,
      title,
      message,
      type,
      actionUrl,
      metadata,
      expiresAt
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO notifications (user_id, title, message, type, action_url, metadata, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, uuid, title, message, type, is_read, action_url, 
                 metadata, expires_at, created_at`,
      [userId, title, message, type, actionUrl, metadata, expiresAt]
    );
    
    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification'
    });
  }
};

// Get notification statistics
const getNotificationStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_notifications,
        COUNT(CASE WHEN is_read = false THEN 1 END) as unread_notifications,
        COUNT(CASE WHEN is_read = true THEN 1 END) as read_notifications,
        COUNT(CASE WHEN type = 'urgent' THEN 1 END) as urgent_notifications,
        COUNT(CASE WHEN type = 'approval' THEN 1 END) as approval_notifications,
        COUNT(CASE WHEN type = 'content' THEN 1 END) as content_notifications,
        COUNT(CASE WHEN type = 'campaign' THEN 1 END) as campaign_notifications
      FROM notifications
      WHERE user_id = $1
    `, [userId]);
    
    const typeStats = await pool.query(`
      SELECT type, COUNT(*) as count
      FROM notifications 
      WHERE user_id = $1
      GROUP BY type
      ORDER BY count DESC
    `, [userId]);
    
    const recentNotifications = await pool.query(`
      SELECT id, uuid, title, type, is_read, created_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 10
    `, [userId]);
    
    res.json({
      success: true,
      data: {
        overview: stats.rows[0],
        byType: typeStats.rows,
        recent: recentNotifications.rows
      }
    });
    
  } catch (error) {
    console.error('Get notification stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification statistics'
    });
  }
};

// Bulk create notifications (admin only)
const bulkCreateNotifications = async (req, res) => {
  try {
    const { notifications } = req.body; // Array of notification objects
    
    if (!Array.isArray(notifications) || notifications.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Notifications array is required'
      });
    }
    
    const values = notifications.map(notification => 
      `(${notification.userId}, '${notification.title}', '${notification.message}', 
       '${notification.type}', '${notification.actionUrl || ''}', 
       '${JSON.stringify(notification.metadata || {})}', 
       ${notification.expiresAt ? `'${notification.expiresAt}'` : 'NULL'})`
    ).join(', ');
    
    const query = `
      INSERT INTO notifications (user_id, title, message, type, action_url, metadata, expires_at)
      VALUES ${values}
      RETURNING id, uuid, title, message, type, user_id, created_at
    `;
    
    const result = await pool.query(query);
    
    res.status(201).json({
      success: true,
      message: `${result.rows.length} notifications created successfully`,
      data: result.rows
    });
    
  } catch (error) {
    console.error('Bulk create notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notifications'
    });
  }
};

module.exports = {
  getUserNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification,
  getNotificationStats,
  bulkCreateNotifications
};
