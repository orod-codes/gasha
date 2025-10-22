const mongoose = require('mongoose');
const connectDB = require('./src/config/database');
const User = require('./src/models/User');

async function testModuleOperations() {
  try {
    // Connect to database
    await connectDB();
    console.log('🔧 Testing module operations...');
    
    // Create a test admin user
    const testUser = new User({
      email: 'test-admin@securityservice.com',
      password: 'test123',
      name: 'Test Admin',
      role: 'admin',
      modules: ['gasha-antivirus'], // Start with one module
      status: 'active'
    });
    
    await testUser.save();
    console.log('✅ Created test admin user');
    console.log('Initial modules:', testUser.getActiveModules());
    
    // Test adding a module
    const addResult = testUser.addModule('nisir');
    console.log('Add nisir module result:', addResult);
    console.log('Modules after adding nisir:', testUser.getActiveModules());
    
    // Save the user
    await testUser.save();
    console.log('✅ Saved user after adding module');
    
    // Reload user from database
    const reloadedUser = await User.findById(testUser._id);
    console.log('Reloaded user modules:', reloadedUser.getActiveModules());
    
    // Test adding another module
    const addResult2 = reloadedUser.addModule('enyuma');
    console.log('Add enyuma module result:', addResult2);
    console.log('Modules after adding enyuma:', reloadedUser.getActiveModules());
    
    await reloadedUser.save();
    console.log('✅ Saved user after adding second module');
    
    // Test adding a fourth module (should fail)
    const addResult3 = reloadedUser.addModule('codepro');
    console.log('Add codepro module result (should be false):', addResult3);
    
    // Test removing a module
    const removeResult = reloadedUser.removeModule('nisir');
    console.log('Remove nisir module result:', removeResult);
    console.log('Modules after removing nisir:', reloadedUser.getActiveModules());
    
    await reloadedUser.save();
    console.log('✅ Saved user after removing module');
    
    // Final reload to verify
    const finalUser = await User.findById(testUser._id);
    console.log('Final modules in database:', finalUser.getActiveModules());
    console.log('Final modules array:', finalUser.modules);
    console.log('Final module field:', finalUser.module);
    
    // Clean up - delete test user
    await User.findByIdAndDelete(testUser._id);
    console.log('✅ Cleaned up test user');
    
    console.log('🎉 Module operations test completed successfully!');
    
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
  testModuleOperations()
    .then(() => {
      console.log('✅ Module operations test complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Module operations test failed:', error);
      process.exit(1);
    });
}

module.exports = testModuleOperations;


