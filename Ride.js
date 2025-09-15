const mongoose = require('mongoose');
const RideSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  seatsTotal: { type: Number, default: 12 },
  seatsLeft: { type: Number, default: 12 },
  pricePerSeat: { type: Number, required: true },
  vehicleInfo: String,
  status: { type: String, enum: ['open','full','cancelled'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Ride', RideSchema);
