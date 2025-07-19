const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  expense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  },

  action: {
    type: String,
    enum: ['created', 'status_changed'],
    required: true
  },

  message: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
