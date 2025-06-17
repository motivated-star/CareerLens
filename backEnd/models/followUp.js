const mongoose = require('mongoose');
const followUpSchema = new mongoose.Schema({
  to: String,
  message: String,
  scheduledAt: Date,
  sent: { type: Boolean, default: false },
});
module.exports = mongoose.model('FollowUp', followUpSchema);