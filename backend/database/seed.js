const bcrypt = require('bcryptjs');
const pool = require('../src/config/database');

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting database seeding...');
    
    // Hash passwords
    const hashedPassword = await bcrypt.hash('demo123', 12);
    
    // Insert default users
    const users = [
      {
        email: 'superadmin@securityservice.com',
        password_hash: hashedPassword,
        name: 'Super Administrator',
        role: 'super-admin',
        module: null
      },
      {
        email: 'admin@securityservice.com',
        password_hash: hashedPassword,
        name: 'Administrator',
        role: 'admin',
        module: 'gasha-antivirus'
      },
      {
        email: 'marketing@securityservice.com',
        password_hash: hashedPassword,
        name: 'Marketing Specialist',
        role: 'marketing',
        module: 'gasha-antivirus'
      },
      {
        email: 'technical@securityservice.com',
        password_hash: hashedPassword,
        name: 'Technical Specialist',
        role: 'technical',
        module: 'gasha-antivirus'
      },
      {
        email: 'developer@securityservice.com',
        password_hash: hashedPassword,
        name: 'Developer',
        role: 'developer',
        module: 'gasha-antivirus'
      }
    ];
    
    console.log('👥 Seeding users...');
    for (const user of users) {
      await client.query(
        `INSERT INTO users (email, password_hash, name, role, module) 
         VALUES ($1, $2, $3, $4, $5) 
         ON CONFLICT (email) DO NOTHING`,
        [user.email, user.password_hash, user.name, user.role, user.module]
      );
    }
    
    // Insert products
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
        has_download: true,
        has_request: true,
        has_show_products: false
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
        has_download: false,
        has_request: true,
        has_show_products: false
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
        has_download: true,
        has_request: true,
        has_show_products: false
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
        has_download: false,
        has_request: true,
        has_show_products: false
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
        has_download: false,
        has_request: false,
        has_show_products: true
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
        has_download: false,
        has_request: false,
        has_show_products: true
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
        has_download: false,
        has_request: true,
        has_show_products: false
      }
    ];
    
    console.log('📦 Seeding products...');
    for (const product of products) {
      await client.query(
        `INSERT INTO products (name, category, description, features, module, has_download, has_request, has_show_products) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         ON CONFLICT (name) DO NOTHING`,
        [product.name, product.category, product.description, product.features, product.module, product.has_download, product.has_request, product.has_show_products]
      );
    }
    
    // Insert sample content
    const content = [
      {
        title: 'Welcome to Security Service Platform',
        content: 'This is the official blog of Security Service Platform. Here you will find the latest updates, security insights, and product announcements.',
        author_id: 1,
        type: 'blog',
        scope: 'global',
        status: 'published',
        published_at: new Date()
      },
      {
        title: 'New GASHA Antivirus Features Released',
        content: 'We are excited to announce new features in GASHA Antivirus including enhanced threat detection and improved performance.',
        author_id: 1,
        type: 'news',
        scope: 'global',
        status: 'published',
        published_at: new Date()
      }
    ];
    
    console.log('📝 Seeding content...');
    for (const item of content) {
      await client.query(
        `INSERT INTO content (title, content, author_id, type, scope, status, published_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         ON CONFLICT DO NOTHING`,
        [item.title, item.content, item.author_id, item.type, item.scope, item.status, item.published_at]
      );
    }
    
    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    client.release();
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
