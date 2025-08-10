const mongoose = require('mongoose');

const SmsLogSchema = new mongoose.Schema({
  to: String,
  from: String,
  text: String,
  response: mongoose.Schema.Types.Mixed,
  success: Boolean,
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SmsLog', SmsLogSchema);
