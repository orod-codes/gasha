const mongoose = require('mongoose');
const connectDB = require('../src/config/database');
const User = require('../src/models/User');

async function migrateUserModules() {
  try {
    // Connect to database
    await connectDB();
    console.log('🔧 Starting module migration...');
    
    // Find all users that have the old 'module' field but no 'modules' array
    const usersToMigrate = await User.find({
      module: { $exists: true, $ne: null },
      $or: [
        { modules: { $exists: false } },
        { modules: { $size: 0 } }
      ]
    });
    
    console.log(`📋 Found ${usersToMigrate.length} users to migrate`);
    
    for (const user of usersToMigrate) {
      console.log(`🔧 Migrating user: ${user.name} (${user.email})`);
      console.log(`📋 Old module: ${user.module}`);
      
      // Migrate single module to modules array
      if (user.module) {
        user.modules = [user.module];
        console.log(`📋 New modules array:`, user.modules);
        
        // Save the user
        await user.save();
        console.log(`✅ Migrated user: ${user.name}`);
      }
    }
    
    // Verify migration
    console.log('\n🔍 Verifying migration...');
    const allUsers = await User.find({}).select('name email modules module');
    
    allUsers.forEach(user => {
      console.log(`📋 ${user.name} (${user.email}):`);
      console.log(`   - modules array:`, user.modules);
      console.log(`   - old module field:`, user.module);
      console.log(`   - getActiveModules():`, user.getActiveModules());
    });
    
    console.log('🎉 Module migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Module migration failed:', error);
    throw error;
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateUserModules()
    .then(() => {
      console.log('✅ Module migration complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Module migration failed:', error);
      process.exit(1);
    });
}

module.exports = migrateUserModules;


