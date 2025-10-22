const mongoose = require('mongoose');
const connectDB = require('../src/config/database');
const Module = require('../src/models/Module');
const User = require('../src/models/User');

async function initializeModules() {
  try {
    // Connect to database
    await connectDB();
    console.log('🔧 Initializing default modules...');
    
    // Get super admin user
    const superAdmin = await User.findOne({ role: 'super-admin' });
    if (!superAdmin) {
      console.log('❌ Super admin not found, cannot initialize modules');
      return;
    }
    
    console.log(`📋 Using super admin: ${superAdmin.name} (${superAdmin.email})`);
    
    // Default modules to create
    const defaultModules = [
      {
        name: 'gasha',
        displayName: 'GASHA',
        description: 'GASHA Security Suite - Comprehensive security solutions',
        logo: '/images/gasha-logo.png'
      },
      {
        name: 'nisir',
        displayName: 'NISIR',
        description: 'NISIR SIEM - Security Information and Event Management',
        logo: '/images/nisir-logo.png'
      },
      {
        name: 'enyuma',
        displayName: 'ENYUMA',
        description: 'ENYUMA IAM - Identity and Access Management',
        logo: '/images/enyuma-logo.png'
      },
      {
        name: 'codepro',
        displayName: 'CODEPRO',
        description: 'CODEPRO - Code Protection and Security',
        logo: '/images/codepro-logo.png'
      },
      {
        name: 'biometrics',
        displayName: 'Biometrics',
        description: 'Biometric Authentication and ABIS System',
        logo: '/images/biometrics-logo.png'
      }
    ];
    
    let createdCount = 0;
    let skippedCount = 0;
    
    for (const moduleData of defaultModules) {
      // Check if module already exists
      const existingModule = await Module.findOne({ name: moduleData.name });
      
      if (existingModule) {
        console.log(`⏭️  Module '${moduleData.name}' already exists, skipping...`);
        skippedCount++;
        continue;
      }
      
      // Create new module
      const module = new Module({
        ...moduleData,
        createdBy: superAdmin._id
      });
      
      await module.save();
      console.log(`✅ Created module: ${module.displayName} (${module.name})`);
      createdCount++;
    }
    
    console.log(`\n📊 Module initialization summary:`);
    console.log(`   ✅ Created: ${createdCount} modules`);
    console.log(`   ⏭️  Skipped: ${skippedCount} modules`);
    console.log(`   📋 Total modules in database: ${await Module.countDocuments()}`);
    
    console.log('\n🎉 Module initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Module initialization failed:', error);
    throw error;
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeModules()
    .then(() => {
      console.log('✅ Module initialization complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Module initialization failed:', error);
      process.exit(1);
    });
}

module.exports = initializeModules;


