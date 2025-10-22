const mongoose = require('mongoose');

const downloadRequestSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  nationalId: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    enum: ['android', 'windows', 'mac', 'linux'],
    default: null
  },
  otp: {
    type: String,
    trim: true,
    default: null
  },
  password: {
    type: String,
    trim: true,
    default: null
  },
  downloaded: {
    type: Boolean,
    default: false
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  ipAddress: {
    type: String,
    trim: true,
    default: null
  },
  userAgent: {
    type: String,
    trim: true,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DownloadRequest', downloadRequestSchema);
