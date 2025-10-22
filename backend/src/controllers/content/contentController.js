const Content = require('../../models/Content');
const User = require('../../models/User');

// Get all content
const getContent = async (req, res) => {
  try {
    const content = await Content.find({})
      .populate('author', 'name email role')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: content,
      count: content.length
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
const getContentItem = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id)
      .populate('author', 'name email role');
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      data: content
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
    const contentData = {
      ...req.body,
      author: req.user.userId
    };
    const content = new Content(contentData);
    await content.save();
    
    // Populate the created content
    await content.populate('author', 'name email role');
    
    res.status(201).json({
      success: true,
      data: content,
      message: 'Content created successfully'
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
    const updateData = req.body;
    
    const content = await Content.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name email role');
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      data: content,
      message: 'Content updated successfully'
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update content'
    });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndDelete(id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete content'
    });
  }
};

module.exports = {
  getContent,
  getContentItem,
  createContent,
  updateContent,
  deleteContent
};