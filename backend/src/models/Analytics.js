const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  metricName: {
    type: String,
    required: true,
    trim: true
  },
  metricValue: {
    type: Number,
    required: true
  },
  metricType: {
    type: String,
    enum: ['counter', 'gauge', 'histogram', 'summary'],
    required: true
  },
  labels: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  module: {
    type: String,
    trim: true,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  recordedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
analyticsSchema.index({ metricName: 1, recordedAt: -1 });
analyticsSchema.index({ module: 1, recordedAt: -1 });
analyticsSchema.index({ user: 1, recordedAt: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
