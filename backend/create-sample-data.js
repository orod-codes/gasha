const mongoose = require('mongoose');
const User = require('./src/models/User');
const Request = require('./src/models/Request');
const Notification = require('./src/models/Notification');
require('dotenv').config();

async function createSampleData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/security_service');
    console.log('Connected to database');
    
    // Get the dorsis user
    const dorsisUser = await User.findOne({ email: 'dorsis1@gmail.com' });
    if (!dorsisUser) {
      console.log('Dorsis user not found');
      return;
    }
    console.log('Found dorsis user:', dorsisUser.name);
    
    // Create some sample requests for the enyuma module
    const sampleRequests = [
      {
        productId: 'enyuma-iam-demo',
        userId: dorsisUser._id,
        status: 'pending',
        formData: {
          companyName: 'Tech Corp',
          contactEmail: 'contact@techcorp.com',
          phoneNumber: '+1234567890',
          businessType: 'Enterprise',
          requirements: 'Need IAM solution for 500 employees'
        },
        marketingNotes: 'Potential enterprise customer',
        adminNotes: 'Requires custom configuration',
        assignedTo: dorsisUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 'enyuma-iam-demo2',
        userId: dorsisUser._id,
        status: 'validated',
        formData: {
          companyName: 'Security Solutions Inc',
          contactEmail: 'admin@securitysolutions.com',
          phoneNumber: '+1987654321',
          businessType: 'Government',
          requirements: 'Government-grade IAM solution'
        },
        marketingNotes: 'Government contract opportunity',
        adminNotes: 'Validated requirements, ready for approval',
        assignedTo: dorsisUser._id,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date()
      }
    ];
    
    console.log('Creating sample requests...');
    const createdRequests = await Request.insertMany(sampleRequests);
    console.log('Created', createdRequests.length, 'requests');
    
    // Create some sample notifications for dorsis
    const sampleNotifications = [
      {
        user: dorsisUser._id,
        title: 'New Request Assignment',
        message: 'You have been assigned to handle a new ENYUMA IAM request from Tech Corp',
        type: 'assignment',
        isRead: false,
        actionUrl: '/dashboard/admin/requests',
        createdAt: new Date()
      },
      {
        user: dorsisUser._id,
        title: 'Request Status Update',
        message: 'Security Solutions Inc request has been validated and is ready for your review',
        type: 'status_update',
        isRead: false,
        actionUrl: '/dashboard/admin/requests',
        createdAt: new Date(Date.now() - 3600000) // 1 hour ago
      }
    ];
    
    console.log('Creating sample notifications...');
    const createdNotifications = await Notification.insertMany(sampleNotifications);
    console.log('Created', createdNotifications.length, 'notifications');
    
    console.log('Sample data created successfully!');
    console.log('Dorsis now has:');
    console.log('-', createdRequests.length, 'requests to manage');
    console.log('-', createdNotifications.length, 'notifications');
    console.log('- Assigned to ENYUMA module');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

createSampleData();

