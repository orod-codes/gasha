const pool = require('../../config/database');

// Get dashboard analytics
const getDashboardAnalytics = async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    // Calculate date range based on period
    let dateFilter = '';
    switch (period) {
      case '7d':
        dateFilter = "AND created_at >= CURRENT_DATE - INTERVAL '7 days'";
        break;
      case '30d':
        dateFilter = "AND created_at >= CURRENT_DATE - INTERVAL '30 days'";
        break;
      case '90d':
        dateFilter = "AND created_at >= CURRENT_DATE - INTERVAL '90 days'";
        break;
      case '1y':
        dateFilter = "AND created_at >= CURRENT_DATE - INTERVAL '1 year'";
        break;
      default:
        dateFilter = "AND created_at >= CURRENT_DATE - INTERVAL '30 days'";
    }
    
    // Get overview statistics
    const overviewStats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM products WHERE status = 'active') as active_products,
        (SELECT COUNT(*) FROM requests ${dateFilter}) as total_requests,
        (SELECT COUNT(*) FROM requests WHERE status = 'completed' ${dateFilter}) as completed_requests,
        (SELECT COUNT(*) FROM tasks ${dateFilter}) as total_tasks,
        (SELECT COUNT(*) FROM tasks WHERE status = 'completed' ${dateFilter}) as completed_tasks,
        (SELECT COUNT(*) FROM content WHERE status = 'published' ${dateFilter}) as published_content
    `);
    
    // Get request statistics by status
    const requestStats = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM requests 
      WHERE created_at >= CURRENT_DATE - INTERVAL '${period.replace('d', ' days').replace('y', ' year')}'
      GROUP BY status
      ORDER BY count DESC
    `);
    
    // Get task statistics by status
    const taskStats = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM tasks 
      WHERE created_at >= CURRENT_DATE - INTERVAL '${period.replace('d', ' days').replace('y', ' year')}'
      GROUP BY status
      ORDER BY count DESC
    `);
    
    // Get product statistics
    const productStats = await pool.query(`
      SELECT category, COUNT(*) as count
      FROM products 
      WHERE status = 'active'
      GROUP BY category
      ORDER BY count DESC
    `);
    
    // Get user statistics by role
    const userStats = await pool.query(`
      SELECT role, COUNT(*) as count
      FROM users 
      WHERE status = 'active'
      GROUP BY role
      ORDER BY count DESC
    `);
    
    // Get recent activity
    const recentActivity = await pool.query(`
      SELECT 
        'request' as type,
        r.id,
        r.company_name as title,
        r.status,
        r.created_at,
        p.name as product_name
      FROM requests r
      LEFT JOIN products p ON r.product_id = p.id
      WHERE r.created_at >= CURRENT_DATE - INTERVAL '${period.replace('d', ' days').replace('y', ' year')}'
      
      UNION ALL
      
      SELECT 
        'task' as type,
        t.id,
        t.title,
        t.status,
        t.created_at,
        p.name as product_name
      FROM tasks t
      LEFT JOIN requests r ON t.request_id = r.id
      LEFT JOIN products p ON r.product_id = p.id
      WHERE t.created_at >= CURRENT_DATE - INTERVAL '${period.replace('d', ' days').replace('y', ' year')}'
      
      ORDER BY created_at DESC
      LIMIT 20
    `);
    
    res.json({
      success: true,
      data: {
        overview: overviewStats.rows[0],
        requests: requestStats.rows,
        tasks: taskStats.rows,
        products: productStats.rows,
        users: userStats.rows,
        recentActivity: recentActivity.rows
      }
    });
    
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard analytics'
    });
  }
};

// Get request analytics
const getRequestAnalytics = async (req, res) => {
  try {
    const { period = '30d', groupBy = 'day' } = req.query;
    
    let dateInterval = '';
    let groupByClause = '';
    
    switch (groupBy) {
      case 'hour':
        dateInterval = "INTERVAL '1 hour'";
        groupByClause = "DATE_TRUNC('hour', created_at)";
        break;
      case 'day':
        dateInterval = "INTERVAL '1 day'";
        groupByClause = "DATE_TRUNC('day', created_at)";
        break;
      case 'week':
        dateInterval = "INTERVAL '1 week'";
        groupByClause = "DATE_TRUNC('week', created_at)";
        break;
      case 'month':
        dateInterval = "INTERVAL '1 month'";
        groupByClause = "DATE_TRUNC('month', created_at)";
        break;
      default:
        dateInterval = "INTERVAL '1 day'";
        groupByClause = "DATE_TRUNC('day', created_at)";
    }
    
    const periodDays = period.replace('d', '').replace('y', ' * 365');
    const dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${periodDays} days'`;
    
    // Get request trends
    const requestTrends = await pool.query(`
      SELECT 
        ${groupByClause} as period,
        COUNT(*) as total_requests,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_requests,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_requests,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_requests
      FROM requests
      WHERE ${dateFilter}
      GROUP BY ${groupByClause}
      ORDER BY period DESC
    `);
    
    // Get request statistics by product
    const requestByProduct = await pool.query(`
      SELECT 
        p.name as product_name,
        p.category,
        COUNT(r.id) as request_count,
        COUNT(CASE WHEN r.status = 'completed' THEN 1 END) as completed_count
      FROM requests r
      LEFT JOIN products p ON r.product_id = p.id
      WHERE r.${dateFilter}
      GROUP BY p.id, p.name, p.category
      ORDER BY request_count DESC
    `);
    
    // Get request statistics by priority
    const requestByPriority = await pool.query(`
      SELECT 
        priority,
        COUNT(*) as count,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count
      FROM requests
      WHERE ${dateFilter}
      GROUP BY priority
      ORDER BY count DESC
    `);
    
    res.json({
      success: true,
      data: {
        trends: requestTrends.rows,
        byProduct: requestByProduct.rows,
        byPriority: requestByPriority.rows
      }
    });
    
  } catch (error) {
    console.error('Get request analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch request analytics'
    });
  }
};

// Get task analytics
const getTaskAnalytics = async (req, res) => {
  try {
    const { period = '30d', groupBy = 'day' } = req.query;
    
    let groupByClause = '';
    
    switch (groupBy) {
      case 'hour':
        groupByClause = "DATE_TRUNC('hour', created_at)";
        break;
      case 'day':
        groupByClause = "DATE_TRUNC('day', created_at)";
        break;
      case 'week':
        groupByClause = "DATE_TRUNC('week', created_at)";
        break;
      case 'month':
        groupByClause = "DATE_TRUNC('month', created_at)";
        break;
      default:
        groupByClause = "DATE_TRUNC('day', created_at)";
    }
    
    const periodDays = period.replace('d', '').replace('y', ' * 365');
    const dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${periodDays} days'`;
    
    // Get task trends
    const taskTrends = await pool.query(`
      SELECT 
        ${groupByClause} as period,
        COUNT(*) as total_tasks,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_tasks,
        COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_tasks,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks
      FROM tasks
      WHERE ${dateFilter}
      GROUP BY ${groupByClause}
      ORDER BY period DESC
    `);
    
    // Get task statistics by type
    const taskByType = await pool.query(`
      SELECT 
        task_type,
        COUNT(*) as count,
        AVG(progress) as avg_progress,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count
      FROM tasks
      WHERE ${dateFilter}
      GROUP BY task_type
      ORDER BY count DESC
    `);
    
    // Get task statistics by assigned user
    const taskByUser = await pool.query(`
      SELECT 
        u.name as user_name,
        u.role,
        COUNT(t.id) as task_count,
        AVG(t.progress) as avg_progress,
        COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_count
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to = u.id
      WHERE t.${dateFilter}
      GROUP BY u.id, u.name, u.role
      ORDER BY task_count DESC
    `);
    
    res.json({
      success: true,
      data: {
        trends: taskTrends.rows,
        byType: taskByType.rows,
        byUser: taskByUser.rows
      }
    });
    
  } catch (error) {
    console.error('Get task analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task analytics'
    });
  }
};

// Get user analytics
const getUserAnalytics = async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    const periodDays = period.replace('d', '').replace('y', ' * 365');
    const dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${periodDays} days'`;
    
    // Get user statistics by role
    const userByRole = await pool.query(`
      SELECT 
        role,
        COUNT(*) as total_users,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
        COUNT(CASE WHEN last_login >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as recent_logins
      FROM users
      WHERE ${dateFilter}
      GROUP BY role
      ORDER BY total_users DESC
    `);
    
    // Get user activity
    const userActivity = await pool.query(`
      SELECT 
        DATE_TRUNC('day', last_login) as login_date,
        COUNT(*) as login_count
      FROM users
      WHERE last_login IS NOT NULL 
      AND last_login >= CURRENT_DATE - INTERVAL '${periodDays} days'
      GROUP BY DATE_TRUNC('day', last_login)
      ORDER BY login_date DESC
    `);
    
    // Get user creation trends
    const userCreationTrends = await pool.query(`
      SELECT 
        DATE_TRUNC('day', created_at) as creation_date,
        COUNT(*) as new_users
      FROM users
      WHERE ${dateFilter}
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY creation_date DESC
    `);
    
    res.json({
      success: true,
      data: {
        byRole: userByRole.rows,
        activity: userActivity.rows,
        creationTrends: userCreationTrends.rows
      }
    });
    
  } catch (error) {
    console.error('Get user analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user analytics'
    });
  }
};

// Get content analytics
const getContentAnalytics = async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    const periodDays = period.replace('d', '').replace('y', ' * 365');
    const dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${periodDays} days'`;
    
    // Get content statistics
    const contentStats = await pool.query(`
      SELECT 
        type,
        COUNT(*) as total_content,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_content,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_content
      FROM content
      WHERE ${dateFilter}
      GROUP BY type
      ORDER BY total_content DESC
    `);
    
    // Get content by author
    const contentByAuthor = await pool.query(`
      SELECT 
        u.name as author_name,
        u.role,
        COUNT(c.id) as content_count,
        COUNT(CASE WHEN c.status = 'published' THEN 1 END) as published_count
      FROM content c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE c.${dateFilter}
      GROUP BY u.id, u.name, u.role
      ORDER BY content_count DESC
    `);
    
    // Get content creation trends
    const contentTrends = await pool.query(`
      SELECT 
        DATE_TRUNC('day', created_at) as creation_date,
        COUNT(*) as new_content,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_content
      FROM content
      WHERE ${dateFilter}
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY creation_date DESC
    `);
    
    res.json({
      success: true,
      data: {
        byType: contentStats.rows,
        byAuthor: contentByAuthor.rows,
        trends: contentTrends.rows
      }
    });
    
  } catch (error) {
    console.error('Get content analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content analytics'
    });
  }
};

// Get system health metrics
const getSystemHealth = async (req, res) => {
  try {
    // Get database connection status
    const dbStatus = await pool.query('SELECT 1 as status');
    
    // Get system metrics
    const systemMetrics = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE status = 'active') as active_users,
        (SELECT COUNT(*) FROM requests WHERE status = 'pending') as pending_requests,
        (SELECT COUNT(*) FROM tasks WHERE status = 'in-progress') as active_tasks,
        (SELECT COUNT(*) FROM notifications WHERE is_read = false) as unread_notifications
    `);
    
    // Get recent errors (if you have an error log table)
    const recentErrors = await pool.query(`
      SELECT 'No error log table' as message
      LIMIT 0
    `);
    
    res.json({
      success: true,
      data: {
        database: {
          status: dbStatus.rows[0].status === 1 ? 'healthy' : 'unhealthy',
          connection: 'active'
        },
        metrics: systemMetrics.rows[0],
        errors: recentErrors.rows
      }
    });
    
  } catch (error) {
    console.error('Get system health error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch system health metrics'
    });
  }
};

module.exports = {
  getDashboardAnalytics,
  getRequestAnalytics,
  getTaskAnalytics,
  getUserAnalytics,
  getContentAnalytics,
  getSystemHealth
};
