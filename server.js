require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

const rideRoutes = require('./routes/rides');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

app.use(cors());
app.use(bodyParser.json());

// simple socket.io setup for realtime booking notifications
io.on('connection', socket => {
  console.log('Socket connected:', socket.id);
  socket.on('join_driver', driverId => socket.join('driver_' + driverId));
  socket.on('disconnect', () => {});
});
app.set('io', io);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    server.listen(PORT, ()=> console.log('Backend running on port', PORT));
  })
  .catch(err => console.error('MongoDB error', err));
