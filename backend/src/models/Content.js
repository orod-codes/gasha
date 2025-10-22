const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['blog', 'news', 'documentation', 'announcement'],
    required: true
  },
  scope: {
    type: String,
    enum: ['global', 'module'],
    default: 'global'
  },
  module: {
    type: String,
    trim: true,
    default: null
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featuredImage: {
    type: String,
    trim: true,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  metaDescription: {
    type: String,
    trim: true,
    default: null
  },
  publishedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for unique title per type
contentSchema.index({ title: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);
