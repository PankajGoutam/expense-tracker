const AuditLog = require('../models/auditLogModel');

const getAllLogs = async () => {
  return await AuditLog.find()
    .populate('user', 'name email')
    .populate('expense', 'category amount date status')
    .sort({ createdAt: -1 });
};

module.exports = {
  getAllLogs
};
