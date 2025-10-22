const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

async function initializeDatabase() {
  try {
    console.log('🔧 Initializing database...');
    
    // Check if superadmin exists
    const existingSuperAdmin = await User.findOne({ role: 'super-admin' });
    
    if (!existingSuperAdmin) {
      console.log('👤 Creating superadmin user...');
      
      // Hash password
      const hashedPassword = await bcrypt.hash('demo123', 12);
      
      // Create superadmin
      const superAdmin = new User({
        email: 'superadmin@securityservice.com',
        password: hashedPassword,
        name: 'Super Administrator',
        role: 'super-admin',
        modules: [], // Super admin has no module restrictions
        module: null, // Keep for backward compatibility
        status: 'active'
      });
      
      await superAdmin.save();
      console.log('✅ Superadmin user created successfully');
      console.log('📧 Email: superadmin@securityservice.com');
      console.log('🔑 Password: demo123');
    } else {
      console.log('✅ Superadmin user already exists');
    }
    
    console.log('🎉 Database initialization completed');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  const connectDB = require('../src/config/database');
  
  connectDB()
    .then(async () => {
      await initializeDatabase();
      console.log('✅ Database initialization complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database initialization failed:', error);
      process.exit(1);
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
}

module.exports = initializeDatabase;
