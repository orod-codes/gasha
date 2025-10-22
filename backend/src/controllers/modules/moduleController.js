const Module = require('../../models/Module');

// Get all modules
const getModules = async (req, res) => {
  try {
    const modules = await Module.find({ status: 'active' }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: modules,
      count: modules.length
    });
  } catch (error) {
    console.error('Get modules error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch modules'
    });
  }
};

// Get module by ID
const getModule = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await Module.findById(id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }
    
    res.json({
      success: true,
      data: module
    });
  } catch (error) {
    console.error('Get module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch module'
    });
  }
};

// Create module
const createModule = async (req, res) => {
  try {
    const { name, displayName, description, logo } = req.body;
    const createdBy = req.user.userId || req.user.id; // From auth middleware
    
    console.log(`🔧 Creating module: ${name} by user ${createdBy}`);
    
    // Check if module already exists
    const existingModule = await Module.findOne({ name: name.toLowerCase() });
    if (existingModule) {
      return res.status(400).json({
        success: false,
        message: 'Module with this name already exists'
      });
    }
    
    const module = new Module({
      name: name.toLowerCase(),
      displayName,
      description,
      logo,
      createdBy
    });
    
    await module.save();
    
    console.log(`✅ Module created successfully: ${module.name}`);
    
    res.status(201).json({
      success: true,
      data: module,
      message: 'Module created successfully'
    });
  } catch (error) {
    console.error('Create module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create module',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update module
const updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    console.log(`🔧 Updating module: ${id}`);
    
    const module = await Module.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }
    
    console.log(`✅ Module updated successfully: ${module.name}`);
    
    res.json({
      success: true,
      data: module,
      message: 'Module updated successfully'
    });
  } catch (error) {
    console.error('Update module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update module'
    });
  }
};

// Delete module
const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🔧 Deleting module: ${id}`);
    
    const module = await Module.findByIdAndDelete(id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }
    
    console.log(`✅ Module deleted successfully: ${module.name}`);
    
    res.json({
      success: true,
      message: 'Module deleted successfully'
    });
  } catch (error) {
    console.error('Delete module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete module'
    });
  }
};

module.exports = {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule
};
