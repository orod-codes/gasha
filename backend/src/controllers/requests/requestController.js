const Request = require('../../models/Request');
const Product = require('../../models/Product');
const Notification = require('../../models/Notification');
const User = require('../../models/User');

// Get all requests
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({})
      .populate('product', 'name category module')
      .populate('user', 'name email role')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: requests,
      count: requests.length
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
const getRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id)
      .populate('product', 'name category module')
      .populate('user', 'name email role')
      .populate('assignedTo', 'name email');
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      data: request
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
    const requestData = req.body;
    const request = new Request(requestData);
    await request.save();
    
    // Populate the created request
    await request.populate('product', 'name category module');
    
    // Create notifications for marketing team
    try {
      const marketingUsers = await User.find({ role: 'marketing' });
      
      for (const user of marketingUsers) {
        const notification = new Notification({
          user: user._id,
          type: 'request',
          title: 'New Customer Request',
          message: `New request submitted for ${request.product.name} by ${requestData.companyName || 'Unknown Company'}`,
          data: {
            requestId: request._id,
            productName: request.product.name,
            companyName: requestData.companyName,
            contactPerson: requestData.contactPerson,
            email: requestData.email,
            priority: requestData.priority || 'medium'
          },
          isRead: false
        });
        
        await notification.save();
      }
    } catch (notificationError) {
      console.error('Error creating notifications:', notificationError);
      // Don't fail the request creation if notifications fail
    }
    
    res.status(201).json({
      success: true,
      data: request,
      message: 'Request created successfully'
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create request'
    });
  }
};

// Update request
const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const request = await Request.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('product', 'name category module')
     .populate('user', 'name email role')
     .populate('assignedTo', 'name email');
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      data: request,
      message: 'Request updated successfully'
    });
  } catch (error) {
    console.error('Update request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update request'
    });
  }
};

// Delete request
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndDelete(id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Request deleted successfully'
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
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest
};