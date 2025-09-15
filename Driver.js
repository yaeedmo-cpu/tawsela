const mongoose = require('mongoose');
const DriverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  vehiclePlate: String,
  vehicleModel: String,
  active: { type: Boolean, default: true },
});
module.exports = mongoose.model('Driver', DriverSchema);
