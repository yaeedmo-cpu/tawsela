const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  passengerName: String,
  passengerPhone: String,
  seatsBooked: { type: Number, default: 1 },
  paymentMethod: { type: String, enum: ['cash','instapay'], default: 'cash' },
  paymentStatus: { type: String, enum: ['pending','paid'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', BookingSchema);
