const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['super-admin', 'admin', 'marketing', 'technical', 'developer'],
    default: 'admin'
  },
  modules: {
    type: [String],
    default: [],
    validate: {
      validator: function(modules) {
        // Super admin can have any number of modules (0-3)
        if (this.role === 'super-admin') {
          return !modules || modules.length <= 3;
        }
        // Other roles must have at least 1 module, max 3 modules
        return modules && modules.length >= 1 && modules.length <= 3;
      },
      message: 'Users must have 1-3 modules assigned (except super admin)'
    }
  },
  // Keep the old 'module' field for backward compatibility (will be deprecated)
  module: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: 'active'
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Helper method to get active modules (prioritize new modules array over old module field)
userSchema.methods.getActiveModules = function() {
  if (this.modules && this.modules.length > 0) {
    return this.modules;
  }
  // Fallback to old module field for backward compatibility
  return this.module ? [this.module] : [];
};

// Helper method to check if user has access to a specific module
userSchema.methods.hasModuleAccess = function(moduleName) {
  const activeModules = this.getActiveModules();
  return activeModules.includes(moduleName);
};

// Helper method to add a module
userSchema.methods.addModule = function(moduleName) {
  const activeModules = this.getActiveModules();
  if (!activeModules.includes(moduleName) && activeModules.length < 3) {
    // Initialize modules array if it doesn't exist
    if (!this.modules) {
      this.modules = [];
    }
    
    // Add the new module
    this.modules.push(moduleName);
    
    // Clear the old module field if it exists (migrate to new format)
    if (this.module && this.modules.includes(this.module)) {
      // Keep the old module field for backward compatibility, but prioritize modules array
    }
    
    return true;
  }
  return false;
};

// Helper method to remove a module
userSchema.methods.removeModule = function(moduleName) {
  const activeModules = this.getActiveModules();
  
  // For non-super-admin users, cannot remove the last module
  if (this.role !== 'super-admin' && activeModules.length <= 1) {
    return false;
  }
  
  // Initialize modules array if it doesn't exist
  if (!this.modules) {
    this.modules = [];
  }
  
  // Remove from modules array
  this.modules = this.modules.filter(m => m !== moduleName);
  
  // If this was the old single module, clear it
  if (this.module === moduleName) {
    this.module = null;
  }
  
  return true;
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
