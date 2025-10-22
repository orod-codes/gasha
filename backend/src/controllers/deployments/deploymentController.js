const Deployment = require('../../models/Deployment');
const Task = require('../../models/Task');

// Get all deployments
const getDeployments = async (req, res) => {
  try {
    const deployments = await Deployment.find({})
      .populate('task', 'title description status')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: deployments,
      count: deployments.length
    });
  } catch (error) {
    console.error('Get deployments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch deployments'
    });
  }
};

// Get deployment by ID
const getDeployment = async (req, res) => {
  try {
    const { id } = req.params;
    const deployment = await Deployment.findById(id)
      .populate('task', 'title description status');
    
    if (!deployment) {
      return res.status(404).json({
        success: false,
        message: 'Deployment not found'
      });
    }
    
    res.json({
      success: true,
      data: deployment
    });
  } catch (error) {
    console.error('Get deployment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch deployment'
    });
  }
};

// Create deployment
const createDeployment = async (req, res) => {
  try {
    const deploymentData = req.body;
    const deployment = new Deployment(deploymentData);
    await deployment.save();
    
    // Populate the created deployment
    await deployment.populate('task', 'title description status');
    
    res.status(201).json({
      success: true,
      data: deployment,
      message: 'Deployment created successfully'
    });
  } catch (error) {
    console.error('Create deployment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create deployment'
    });
  }
};

// Update deployment
const updateDeployment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const deployment = await Deployment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('task', 'title description status');
    
    if (!deployment) {
      return res.status(404).json({
        success: false,
        message: 'Deployment not found'
      });
    }
    
    res.json({
      success: true,
      data: deployment,
      message: 'Deployment updated successfully'
    });
  } catch (error) {
    console.error('Update deployment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update deployment'
    });
  }
};

// Delete deployment
const deleteDeployment = async (req, res) => {
  try {
    const { id } = req.params;
    const deployment = await Deployment.findByIdAndDelete(id);
    
    if (!deployment) {
      return res.status(404).json({
        success: false,
        message: 'Deployment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Deployment deleted successfully'
    });
  } catch (error) {
    console.error('Delete deployment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete deployment'
    });
  }
};

module.exports = {
  getDeployments,
  getDeployment,
  createDeployment,
  updateDeployment,
  deleteDeployment
};