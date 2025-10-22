const User = require('../../models/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    console.log(`📋 Retrieved ${users.length} users from database`);
    users.forEach(user => {
      console.log(`📋 User: ${user.name} (${user.email}) - Modules:`, user.getActiveModules());
    });
    
    res.json({
      success: true,
      data: users,
      count: users.length
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
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
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
    const userData = req.body;
    
    // Validate that non-super-admin users have at least one module
    if (userData.role !== 'super-admin' && (!userData.modules || userData.modules.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Admin users must have at least one module assigned'
      });
    }
    
    const user = new User(userData);
    await user.save();
    
    // Remove password from response
    const userResponse = user.toJSON();
    
    res.status(201).json({
      success: true,
      data: userResponse,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Create user error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create user';
    
    if (error.name === 'ValidationError') {
      if (error.errors.modules) {
        errorMessage = error.errors.modules.message;
      } else if (error.errors.email) {
        errorMessage = 'Email is already in use';
      } else {
        errorMessage = 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ');
      }
    } else if (error.code === 11000) {
      errorMessage = 'Email is already in use';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
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
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
};

// Add module to user
const addUserModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { module } = req.body;
    
    console.log(`🔧 Adding module '${module}' to user ${id}`);
    
    if (!module) {
      return res.status(400).json({
        success: false,
        message: 'Module name is required'
      });
    }
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    console.log(`📋 User found: ${user.name} (${user.email})`);
    console.log(`📋 Current modules before add:`, user.getActiveModules());
    console.log(`📋 Current modules array:`, user.modules);
    console.log(`📋 Current module field:`, user.module);
    
    // Allow super admin to have modules if needed
    // (Super admin can have 0-3 modules as per business requirements)
    
    const success = user.addModule(module);
    
    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'Cannot add module. User may already have this module or reached the maximum of 3 modules'
      });
    }
    
    console.log(`📋 Modules after add (before save):`, user.getActiveModules());
    console.log(`📋 Modules array after add:`, user.modules);
    
    // Save the user with explicit validation
    const savedUser = await user.save({ validateBeforeSave: true });
    
    console.log(`✅ User saved successfully`);
    console.log(`📋 Final modules after save:`, savedUser.getActiveModules());
    console.log(`📋 Final modules array:`, savedUser.modules);
    
    // Verify by reloading from database
    const reloadedUser = await User.findById(id);
    console.log(`📋 Reloaded user modules:`, reloadedUser.getActiveModules());
    console.log(`📋 Reloaded modules array:`, reloadedUser.modules);
    
    res.json({
      success: true,
      data: savedUser.toJSON(),
      message: `Module '${module}' added successfully`
    });
  } catch (error) {
    console.error('❌ Add user module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add module to user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Remove module from user
const removeUserModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { module } = req.body;
    
    console.log(`🔧 Removing module '${module}' from user ${id}`);
    
    if (!module) {
      return res.status(400).json({
        success: false,
        message: 'Module name is required'
      });
    }
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    console.log(`📋 User found: ${user.name} (${user.email})`);
    console.log(`📋 Current modules before remove:`, user.getActiveModules());
    
    // Allow super admin to remove modules if needed
    
    const success = user.removeModule(module);
    
    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'Cannot remove module. User must have at least one module assigned'
      });
    }
    
    console.log(`📋 Modules after remove (before save):`, user.getActiveModules());
    
    // Save the user with explicit validation
    const savedUser = await user.save({ validateBeforeSave: true });
    
    console.log(`✅ User saved successfully`);
    console.log(`📋 Final modules after save:`, savedUser.getActiveModules());
    
    // Verify by reloading from database
    const reloadedUser = await User.findById(id);
    console.log(`📋 Reloaded user modules:`, reloadedUser.getActiveModules());
    
    res.json({
      success: true,
      data: savedUser.toJSON(),
      message: `Module '${module}' removed successfully`
    });
  } catch (error) {
    console.error('❌ Remove user module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove module from user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get users by module
const getUsersByModule = async (req, res) => {
  try {
    const { module } = req.params;
    
    const users = await User.find({
      $or: [
        { modules: module },
        { module: module } // For backward compatibility
      ]
    }).select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Get users by module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users by module'
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addUserModule,
  removeUserModule,
  getUsersByModule
};