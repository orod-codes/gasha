const mongoose = require('mongoose');
const connectDB = require('./src/config/database');
const User = require('./src/models/User');

async function testDirectDatabase() {
  try {
    // Connect to database
    await connectDB();
    console.log('🔧 Testing direct database operations...');
    
    // Find a test user (not super admin)
    const testUser = await User.findOne({ role: 'admin' });
    
    if (!testUser) {
      console.log('❌ No admin user found for testing');
      return;
    }
    
    console.log(`📋 Testing with user: ${testUser.name} (${testUser.email})`);
    console.log(`📋 Current modules before test:`, testUser.getActiveModules());
    console.log(`📋 Current modules array:`, testUser.modules);
    console.log(`📋 Current module field:`, testUser.module);
    
    // Test adding a module
    console.log('\n🔧 Testing addModule...');
    const addResult = testUser.addModule('nisir');
    console.log(`📋 Add module result: ${addResult}`);
    console.log(`📋 Modules after add:`, testUser.getActiveModules());
    console.log(`📋 Modules array after add:`, testUser.modules);
    
    // Save to database
    console.log('\n💾 Saving to database...');
    const savedUser = await testUser.save();
    console.log(`✅ User saved successfully`);
    console.log(`📋 Saved user modules:`, savedUser.getActiveModules());
    console.log(`📋 Saved user modules array:`, savedUser.modules);
    
    // Close connection and reconnect to simulate refresh
    console.log('\n🔄 Simulating system refresh (reconnecting)...');
    await mongoose.connection.close();
    
    // Reconnect
    await connectDB();
    
    // Reload user from database
    const reloadedUser = await User.findById(testUser._id);
    console.log(`📋 Reloaded user modules:`, reloadedUser.getActiveModules());
    console.log(`📋 Reloaded modules array:`, reloadedUser.modules);
    console.log(`📋 Reloaded module field:`, reloadedUser.module);
    
    // Test adding another module
    console.log('\n🔧 Testing addModule after reload...');
    const addResult2 = reloadedUser.addModule('enyuma');
    console.log(`📋 Add second module result: ${addResult2}`);
    console.log(`📋 Modules after second add:`, reloadedUser.getActiveModules());
    
    // Save again
    await reloadedUser.save();
    console.log(`✅ Second save successful`);
    
    // Final reload
    const finalUser = await User.findById(testUser._id);
    console.log(`📋 Final modules:`, finalUser.getActiveModules());
    console.log(`📋 Final modules array:`, finalUser.modules);
    
    console.log('\n🎉 Direct database test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDirectDatabase()
    .then(() => {
      console.log('✅ Direct database test complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Direct database test failed:', error);
      process.exit(1);
    });
}

module.exports = testDirectDatabase;


