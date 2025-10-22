const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['gasha', 'nisir', 'enyuma', 'codepro', 'biometrics']
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  module: {
    type: String,
    required: true,
    trim: true
  },
  hasDownload: {
    type: Boolean,
    default: false
  },
  hasRequest: {
    type: Boolean,
    default: false
  },
  hasShowProducts: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
