const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// create ride (admin/driver)
router.post('/', async (req, res) => {
  try {
    const r = new Ride(req.body);
    await r.save();
    res.json(r);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// list rides with filters
router.get('/', async (req, res) => {
  try {
    const { from, to, date, maxPrice } = req.query;
    let filter = {};
    if (from) filter.from = from;
    if (to) filter.to = to;
    if (date) filter.date = { $gte: new Date(date) };
    if (maxPrice) filter.pricePerSeat = { $lte: Number(maxPrice) };
    const rides = await Ride.find(filter).sort({ date: 1 });
    res.json(rides);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
