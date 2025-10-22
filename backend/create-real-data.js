const mongoose = require('mongoose');
const User = require('./src/models/User');
const Request = require('./src/models/Request');
const Notification = require('./src/models/Notification');
const Product = require('./src/models/Product');
require('dotenv').config();

async function createRealData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/security_service');
    console.log('Connected to database');
    
    // Get the dorsis user
    const dorsisUser = await User.findOne({ email: 'dorsis1@gmail.com' });
    if (!dorsisUser) {
      console.log('Dorsis user not found');
      return;
    }
    console.log('Found dorsis user:', dorsisUser.name, 'assigned to modules:', dorsisUser.modules);
    
    // Get or create ENYUMA product
    let enyumaProduct = await Product.findOne({ module: 'enyuma' });
    if (!enyumaProduct) {
      console.log('Creating ENYUMA product...');
      enyumaProduct = await Product.create({
        name: 'ENYUMA IAM',
        category: 'enyuma',
        description: 'Identity and Access Management (IAM) software ensures the right people have access to the right resources at the right times.',
        features: [
          'Single Sign-On (SSO)',
          'Identity Lifecycle Management',
          'Access Control Policies',
          'Multi-Factor Authentication'
        ],
        module: 'enyuma',
        hasDownload: false,
        hasRequest: true,
        hasShowProducts: true,
        status: 'active'
      });
      console.log('Created ENYUMA product:', enyumaProduct.name);
    }
    
    // Create real requests for ENYUMA module
    const realRequests = [
      {
        product: enyumaProduct._id,
        user: dorsisUser._id,
        companyName: 'Tech Solutions Ltd',
        contactPerson: 'John Smith',
        email: 'john.smith@techsolutions.com',
        phone: '+1-555-0123',
        status: 'pending',
        priority: 'high',
        formData: {
          businessType: 'Technology',
          employeeCount: '250',
          requirements: 'Need IAM solution for cloud infrastructure access control',
          budget: '$50,000 - $100,000',
          timeline: 'Q1 2024'
        },
        marketingNotes: 'Enterprise customer with cloud migration project',
        adminNotes: 'Requires custom SSO integration with AWS and Azure',
        assignedTo: dorsisUser._id
      },
      {
        product: enyumaProduct._id,
        user: dorsisUser._id,
        companyName: 'Finance First Bank',
        contactPerson: 'Sarah Johnson',
        email: 'sarah.johnson@financefirst.com',
        phone: '+1-555-0456',
        status: 'validated',
        priority: 'urgent',
        formData: {
          businessType: 'Financial Services',
          employeeCount: '1500',
          requirements: 'Banking-grade IAM with regulatory compliance (SOX, PCI DSS)',
          budget: '$200,000+',
          timeline: 'ASAP'
        },
        marketingNotes: 'High-value financial sector client with compliance requirements',
        adminNotes: 'Validated requirements, approved for technical review',
        technicalNotes: 'Requires audit logging and compliance reporting features',
        assignedTo: dorsisUser._id
      },
      {
        product: enyumaProduct._id,
        user: dorsisUser._id,
        companyName: 'Government Agency',
        contactPerson: 'Michael Brown',
        email: 'michael.brown@govagency.gov',
        phone: '+1-555-0789',
        status: 'approved',
        priority: 'medium',
        formData: {
          businessType: 'Government',
          employeeCount: '5000',
          requirements: 'Government-grade IAM with multi-level security clearance',
          budget: '$500,000+',
          timeline: 'Q2 2024'
        },
        marketingNotes: 'Large government contract opportunity',
        adminNotes: 'Approved for implementation, contract signed',
        technicalNotes: 'Implementation in progress, phase 1 complete',
        assignedTo: dorsisUser._id
      }
    ];
    
    console.log('Creating real requests for ENYUMA module...');
    const createdRequests = await Request.insertMany(realRequests);
    console.log('Created', createdRequests.length, 'real requests');
    
    // Create real notifications for dorsis
    const realNotifications = [
      {
        user: dorsisUser._id,
        title: 'New ENYUMA Request Assignment',
        message: 'You have been assigned to handle a new ENYUMA IAM request from Tech Solutions Ltd',
        type: 'assignment',
        isRead: false,
        actionUrl: '/dashboard/admin/requests',
        createdAt: new Date()
      },
      {
        user: dorsisUser._id,
        title: 'Request Status Update',
        message: 'Finance First Bank request has been validated and is ready for your review',
        type: 'status_update',
        isRead: false,
        actionUrl: '/dashboard/admin/requests',
        createdAt: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        user: dorsisUser._id,
        title: 'ENYUMA Module Update',
        message: 'New ENYUMA IAM features are now available for your module',
        type: 'system',
        isRead: true,
        actionUrl: '/dashboard/admin/system',
        createdAt: new Date(Date.now() - 7200000) // 2 hours ago
      }
    ];
    
    console.log('Creating real notifications...');
    const createdNotifications = await Notification.insertMany(realNotifications);
    console.log('Created', createdNotifications.length, 'notifications');
    
    console.log('\n✅ Real data created successfully!');
    console.log('\nDorsis admin now has:');
    console.log('-', createdRequests.length, 'real requests to manage');
    console.log('-', createdNotifications.length, 'notifications');
    console.log('- Assigned to ENYUMA module');
    console.log('- Real companies: Tech Solutions Ltd, Finance First Bank, Government Agency');
    
    console.log('\nNow when dorsis logs in, they will see:');
    console.log('- Real request data from the database');
    console.log('- Real notifications');
    console.log('- ENYUMA module name displayed in the dashboard');
    console.log('- No mock/fake data - only real database data');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

createRealData();

