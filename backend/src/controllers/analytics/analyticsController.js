const Analytics = require('../../models/Analytics');

// Get all analytics
const getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find({})
      .populate('user', 'name email role')
      .sort({ recordedAt: -1 });
    
    res.json({
      success: true,
      data: analytics,
      count: analytics.length
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
};

// Get analytics by module
const getAnalyticsByModule = async (req, res) => {
  try {
    const { module } = req.params;
    const analytics = await Analytics.find({ module })
      .populate('user', 'name email role')
      .sort({ recordedAt: -1 });
    
    res.json({
      success: true,
      data: analytics,
      count: analytics.length
    });
  } catch (error) {
    console.error('Get analytics by module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics by module'
    });
  }
};

// Create analytics record
const createAnalytics = async (req, res) => {
  try {
    const analyticsData = {
      ...req.body,
      user: req.user.userId
    };
    const analytics = new Analytics(analyticsData);
    await analytics.save();
    
    res.status(201).json({
      success: true,
      data: analytics,
      message: 'Analytics record created successfully'
    });
  } catch (error) {
    console.error('Create analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create analytics record'
    });
  }
};

// Get analytics summary
const getAnalyticsSummary = async (req, res) => {
  try {
    const summary = await Analytics.aggregate([
      {
        $group: {
          _id: '$metricName',
          totalValue: { $sum: '$metricValue' },
          count: { $sum: 1 },
          avgValue: { $avg: '$metricValue' }
        }
      },
      {
        $sort: { totalValue: -1 }
      }
    ]);
    
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Get analytics summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics summary'
    });
  }
};

module.exports = {
  getAnalytics,
  getAnalyticsByModule,
  createAnalytics,
  getAnalyticsSummary
};