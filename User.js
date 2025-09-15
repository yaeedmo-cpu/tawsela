const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: { type: String, enum: ['admin','driver','passenger'], default: 'passenger' }
});
module.exports = mongoose.model('User', UserSchema);
