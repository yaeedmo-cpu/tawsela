const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Ride = require('../models/Ride');

// create booking
router.post('/', async (req, res) => {
  try {
    const { rideId, passengerName, passengerPhone, seatsBooked, paymentMethod } = req.body;
    // reduce seats
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    if (ride.seatsLeft < seatsBooked) return res.status(400).json({ error: 'Not enough seats' });

    ride.seatsLeft -= seatsBooked;
    if (ride.seatsLeft <= 0) ride.status = 'full';
    await ride.save();

    const booking = await Booking.create({ rideId, passengerName, passengerPhone, seatsBooked, paymentMethod, paymentStatus: paymentMethod === 'instapay' ? 'pending' : 'pending' });

    // emit socket to driver room (if exists)
    const io = req.app.get('io');
    if (io && ride.driverId) io.to('driver_' + String(ride.driverId)).emit('new_booking', booking);

    res.json(booking);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// list bookings (admin)
router.get('/', async (req, res) => {
  try {
    const list = await Booking.find().populate('rideId');
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
