const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../src/config/database');

// Import models
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Content = require('../src/models/Content');
const Notification = require('../src/models/Notification');

async function seedDatabase() {
  try {
    // Connect to database
    await connectDB();
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Content.deleteMany({});
    await Notification.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Hash password
    const hashedPassword = await bcrypt.hash('demo123', 12);
    
    // Create users
    const users = [
      {
        email: 'superadmin@securityservice.com',
        password: hashedPassword,
        name: 'Super Administrator',
        role: 'super-admin',
        modules: [], // Super admin has access to all modules
        module: null, // Keep for backward compatibility
        status: 'active'
      },
      {
        email: 'admin-multi@securityservice.com',
        password: hashedPassword,
        name: 'Multi-Module Admin',
        role: 'admin',
        modules: ['gasha-antivirus', 'nisir'], // Admin with 2 modules
        module: 'gasha-antivirus', // Keep for backward compatibility
        status: 'active'
      },
      {
        email: 'admin-full@securityservice.com',
        password: hashedPassword,
        name: 'Full Access Admin',
        role: 'admin',
        modules: ['gasha-antivirus', 'nisir', 'enyuma'], // Admin with 3 modules (max)
        module: 'gasha-antivirus', // Keep for backward compatibility
        status: 'active'
      }
    ];

    console.log('👥 Seeding users...');
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create products
    const products = [
      {
        name: 'GASHA Anti-Virus',
        category: 'gasha',
        description: 'Gasha Antivirus gives you powerful protection against viruses, malware, ransomware, and online threats – all while staying light on your system.',
        features: [
          'Powerful Protection - Stops viruses, ransomware, spyware, and other threats before they can harm your files',
          'Fast & Lightweight - Optimized scanning runs smoothly in the background without slowing your PC',
          'Real-Time Security - Always-on monitoring blocks unsafe apps, downloads, and suspicious activity',
          'Easy & Hassle-Free - Automatic updates, safe quarantine, and fewer false alarms keep you protected with no extra effort'
        ],
        module: 'gasha',
        hasDownload: true,
        hasRequest: true,
        hasShowProducts: false,
        status: 'active'
      },
      {
        name: 'GASHA WAF',
        category: 'gasha',
        description: 'Protect your applications against a wide range of threats, including the OWASP Top 10 attacks, malicious file uploads with intelligent antivirus scanning, and sophisticated cyberattacks.',
        features: [
          'Scalable and Flexible - Gasha WAF is designed to meet the needs of businesses of all sizes',
          'Comprehensive Reporting and Compliance - Gain actionable insights into your security posture',
          'Robust Protection - Protect your applications against a wide range of threats'
        ],
        module: 'gasha',
        hasDownload: false,
        hasRequest: true,
        hasShowProducts: false,
        status: 'active'
      },
      {
        name: 'GASHA VPN',
        category: 'gasha',
        description: 'Powered by advanced artificial intelligence and behavioral analysis, Gasha VPN provides secure and private internet access with intelligent threat detection.',
        features: [
          'Intelligent Threat Detection - Powered by advanced artificial intelligence and behavioral analysis',
          'Scalable and Flexible - Gasha VPN is designed to meet the needs of businesses of all sizes',
          'Comprehensive Reporting and Compliance - Gain actionable insights into your security posture'
        ],
        module: 'gasha',
        hasDownload: true,
        hasRequest: true,
        hasShowProducts: false,
        status: 'active'
      },
      {
        name: 'NISIR SIEM',
        category: 'nisir',
        description: 'An advanced Security Information and Event Management (SIEM) solution that empowers organizations to detect, analyze, and respond to threats in real time.',
        features: [
          'Centralized Log Management - Consolidates log data from various sources into a single platform',
          'Unified SOC Reporting - Boost your SOC team\'s efficiency with unified reporting',
          'Enhanced SIEM Capabilities - NISIR integrates advanced solutions such as File Integrity Monitoring',
          'Regulatory Compliance Integration - NISIR supports regulatory compliance by integrating essential frameworks'
        ],
        module: 'nisir',
        hasDownload: false,
        hasRequest: true,
        hasShowProducts: false,
        status: 'active'
      },
      {
        name: 'ENYUMA IAM',
        category: 'enyuma',
        description: 'Identity and Access Management (IAM) software ensures the right people have access to the right resources at the right times.',
        features: [
          'Single Sign-On (SSO) - Users log in once for access to multiple systems',
          'Identity Lifecycle Management - Manages user identities from creation to removal',
          'Access Control Policies - Defines and enforces access rules based on roles and sensitivity',
          'Multi-Factor Authentication - Requires multiple forms of authentication for added security'
        ],
        module: 'enyuma',
        hasDownload: false,
        hasRequest: false,
        hasShowProducts: true,
        status: 'active'
      },
      {
        name: 'CODEPRO Protection',
        category: 'codepro',
        description: 'Codepro is a versatile code protection system that obfuscates and protects an executable file and source code of a program to make it difficult or impossible for humans to understand.',
        features: [
          'Multi-Language Code Protection - Unified system offering strong protection for C/C++, .NET, Java, and Python code',
          'Source and Binary-Level Security - Secure both source code and binaries to prevent unauthorized access',
          'Customizable Obfuscation Techniques - Choose from flexible obfuscation options to enhance code security',
          'Flexible Engagement Plans - Select from plans designed for all project scales'
        ],
        module: 'codepro',
        hasDownload: false,
        hasRequest: false,
        hasShowProducts: true,
        status: 'active'
      },
      {
        name: 'Biometrics ABIS',
        category: 'biometrics',
        description: 'ABIS (Automated Biometric Identification System) is a technology that automates the identification of individuals based on their unique biological characteristics such as Fingerprint, Face, Iris and Voice.',
        features: [
          'Enrollment - Capture biometric data using hardware such as fingerprint scanners or facial recognition cameras',
          'Verification - A way to identify individuals based on their unique characteristics or body measurements',
          'Adjudication - The adjudication procedure resolves complex and anomalous matching cases',
          'Deduplication - Once registered, the system compares the person\'s biometric data with existing records'
        ],
        module: 'biometrics',
        hasDownload: false,
        hasRequest: true,
        hasShowProducts: false,
        status: 'active'
      }
    ];

    console.log('📦 Seeding products...');
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Create sample content
    const content = [
      {
        title: 'Welcome to Security Service Platform',
        content: 'This is the official blog of Security Service Platform. Here you will find the latest updates, security insights, and product announcements.',
        author: createdUsers[0]._id, // Super admin
        type: 'blog',
        scope: 'global',
        status: 'published',
        publishedAt: new Date(),
        tags: ['welcome', 'announcement'],
        metaDescription: 'Welcome to the Security Service Platform blog'
      },
      {
        title: 'New GASHA Antivirus Features Released',
        content: 'We are excited to announce new features in GASHA Antivirus including enhanced threat detection and improved performance.',
        author: createdUsers[0]._id, // Super admin
        type: 'news',
        scope: 'global',
        status: 'published',
        publishedAt: new Date(),
        tags: ['gasha', 'antivirus', 'features'],
        metaDescription: 'New features released for GASHA Antivirus'
      }
    ];

    console.log('📝 Seeding content...');
    const createdContent = await Content.insertMany(content);
    console.log(`✅ Created ${createdContent.length} content items`);

    // Create sample notifications
    const notifications = [
      {
        user: createdUsers[0]._id, // Super admin user
        title: 'Welcome to Security Service Platform',
        message: 'System is ready for configuration',
        type: 'system',
        actionUrl: '/dashboard/super-admin'
      }
    ];

    console.log('🔔 Seeding notifications...');
    const createdNotifications = await Notification.insertMany(notifications);
    console.log(`✅ Created ${createdNotifications.length} notifications`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Demo Users Created:');
    console.log('Super Admin: superadmin@securityservice.com / demo123 (All Modules)');
    console.log('Multi-Module Admin: admin-multi@securityservice.com / demo123 (GASHA + NISIR)');
    console.log('Full Access Admin: admin-full@securityservice.com / demo123 (GASHA + NISIR + ENYUMA)');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Database seeding complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database seeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase;