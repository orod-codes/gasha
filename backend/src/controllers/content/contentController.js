const pool = require('../../config/database');

// Get all content
const getAllContent = async (req, res) => {
  try {
    const { type, status, scope, authorId, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT c.id, c.uuid, c.title, c.content, c.type, c.scope, c.module, c.status, 
             c.featured_image, c.tags, c.meta_description, c.published_at, c.created_at, c.updated_at,
             u.name as author_name, u.email as author_email
      FROM content c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (type) {
      paramCount++;
      query += ` AND c.type = $${paramCount}`;
      params.push(type);
    }
    
    if (status) {
      paramCount++;
      query += ` AND c.status = $${paramCount}`;
      params.push(status);
    }
    
    if (scope) {
      paramCount++;
      query += ` AND c.scope = $${paramCount}`;
      params.push(scope);
    }
    
    if (authorId) {
      paramCount++;
      query += ` AND c.author_id = $${paramCount}`;
      params.push(authorId);
    }
    
    query += ` ORDER BY c.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM content c
      WHERE 1=1
    `;
    
    const countParams = [];
    let countParamCount = 0;
    
    if (type) {
      countParamCount++;
      countQuery += ` AND c.type = $${countParamCount}`;
      countParams.push(type);
    }
    
    if (status) {
      countParamCount++;
      countQuery += ` AND c.status = $${countParamCount}`;
      countParams.push(status);
    }
    
    if (scope) {
      countParamCount++;
      countQuery += ` AND c.scope = $${countParamCount}`;
      countParams.push(scope);
    }
    
    if (authorId) {
      countParamCount++;
      countQuery += ` AND c.author_id = $${countParamCount}`;
      countParams.push(authorId);
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
    console.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content'
    });
  }
};

// Get content by ID
const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT c.id, c.uuid, c.title, c.content, c.type, c.scope, c.module, c.status, 
              c.featured_image, c.tags, c.meta_description, c.published_at, c.created_at, c.updated_at,
              u.name as author_name, u.email as author_email
       FROM content c
       LEFT JOIN users u ON c.author_id = u.id
       WHERE c.uuid = $1 OR c.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content'
    });
  }
};

// Create content
const createContent = async (req, res) => {
  try {
    const {
      title,
      content,
      type,
      scope,
      module,
      featuredImage,
      tags,
      metaDescription
    } = req.body;
    
    const authorId = req.user.id;
    
    const result = await pool.query(
      `INSERT INTO content (title, content, author_id, type, scope, module, 
                           featured_image, tags, meta_description, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'draft')
       RETURNING id, uuid, title, content, type, scope, module, status, 
                 featured_image, tags, meta_description, created_at`,
      [title, content, authorId, type, scope, module, featuredImage, tags, metaDescription]
    );
    
    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create content'
    });
  }
};

// Update content
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      type,
      scope,
      module,
      status,
      featuredImage,
      tags,
      metaDescription
    } = req.body;
    
    let updateFields = [];
    let params = [];
    let paramCount = 0;
    
    if (title) {
      paramCount++;
      updateFields.push(`title = $${paramCount}`);
      params.push(title);
    }
    
    if (content) {
      paramCount++;
      updateFields.push(`content = $${paramCount}`);
      params.push(content);
    }
    
    if (type) {
      paramCount++;
      updateFields.push(`type = $${paramCount}`);
      params.push(type);
    }
    
    if (scope) {
      paramCount++;
      updateFields.push(`scope = $${paramCount}`);
      params.push(scope);
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
      
      // If publishing, set published_at
      if (status === 'published') {
        paramCount++;
        updateFields.push(`published_at = CURRENT_TIMESTAMP`);
      }
    }
    
    if (featuredImage) {
      paramCount++;
      updateFields.push(`featured_image = $${paramCount}`);
      params.push(featuredImage);
    }
    
    if (tags) {
      paramCount++;
      updateFields.push(`tags = $${paramCount}`);
      params.push(tags);
    }
    
    if (metaDescription) {
      paramCount++;
      updateFields.push(`meta_description = $${paramCount}`);
      params.push(metaDescription);
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
      UPDATE content 
      SET ${updateFields.join(', ')}
      WHERE uuid = $${paramCount} OR id = $${paramCount}
      RETURNING id, uuid, title, content, type, scope, module, status, 
                featured_image, tags, meta_description, published_at, updated_at
    `;
    
    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update content'
    });
  }
};

// Publish content
const publishContent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `UPDATE content 
       SET status = 'published', published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE uuid = $1 OR id = $1
       RETURNING id, uuid, title, status, published_at`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content published successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Publish content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to publish content'
    });
  }
};

// Archive content
const archiveContent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `UPDATE content 
       SET status = 'archived', updated_at = CURRENT_TIMESTAMP
       WHERE uuid = $1 OR id = $1
       RETURNING id, uuid, title, status`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content archived successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Archive content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to archive content'
    });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM content WHERE uuid = $1 OR id = $1 RETURNING id, title',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content deleted successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete content'
    });
  }
};

// Get content statistics
const getContentStats = async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_content,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_content,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_content,
        COUNT(CASE WHEN status = 'archived' THEN 1 END) as archived_content,
        COUNT(CASE WHEN type = 'blog' THEN 1 END) as blog_posts,
        COUNT(CASE WHEN type = 'news' THEN 1 END) as news_articles,
        COUNT(CASE WHEN type = 'documentation' THEN 1 END) as documentation
      FROM content
    `);
    
    const typeStats = await pool.query(`
      SELECT type, COUNT(*) as count
      FROM content 
      GROUP BY type
      ORDER BY count DESC
    `);
    
    const statusStats = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM content 
      GROUP BY status
      ORDER BY count DESC
    `);
    
    const recentContent = await pool.query(`
      SELECT c.id, c.uuid, c.title, c.type, c.status, c.created_at,
             u.name as author_name
      FROM content c
      LEFT JOIN users u ON c.author_id = u.id
      ORDER BY c.created_at DESC
      LIMIT 10
    `);
    
    res.json({
      success: true,
      data: {
        overview: stats.rows[0],
        byType: typeStats.rows,
        byStatus: statusStats.rows,
        recent: recentContent.rows
      }
    });
    
  } catch (error) {
    console.error('Get content stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content statistics'
    });
  }
};

// Search content
const searchContent = async (req, res) => {
  try {
    const { q, type, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }
    
    let query = `
      SELECT c.id, c.uuid, c.title, c.content, c.type, c.status, c.created_at,
             u.name as author_name
      FROM content c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE (c.title ILIKE $1 OR c.content ILIKE $1)
    `;
    
    const params = [`%${q}%`];
    let paramCount = 1;
    
    if (type) {
      paramCount++;
      query += ` AND c.type = $${paramCount}`;
      params.push(type);
    }
    
    if (status) {
      paramCount++;
      query += ` AND c.status = $${paramCount}`;
      params.push(status);
    }
    
    query += ` ORDER BY c.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows,
      query: q,
      count: result.rows.length
    });
    
  } catch (error) {
    console.error('Search content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search content'
    });
  }
};

module.exports = {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  publishContent,
  archiveContent,
  deleteContent,
  getContentStats,
  searchContent
};
