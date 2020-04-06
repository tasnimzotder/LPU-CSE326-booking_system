const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });

const contactRoutes = require('./api/routes/contacts');
const auditoriumRoutes = require('./api/routes/auditoriums');
const bookingRoutes = require('./api/routes/bookings');
const statsRouter = require('./api/routes/stats');

const audiHandle = express();
const contacts = express();
// const adminAPI = express();

audiHandle.use(express.urlencoded({ extended: true }));

audiHandle.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

contacts.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

audiHandle.use('/audis', auditoriumRoutes);
audiHandle.use('/bookings', bookingRoutes);
audiHandle.use('/stats', statsRouter);
contacts.use('/', contactRoutes);

audiHandle.get('/', (req, res) => {
  cors(req, res, () => {
    res.status(200).json({
      message: 'Welcome to Auditorium Handle API',
      'GET /contacts': 'get all contacts',
      'POST /contacts': 'post a contact query',
      'GET /audis': 'get all auditorium data',
      'GET /audis/bookings': 'get all auditirium booking data',
      'POST /audis/bookings': 'booking an auditorium',
    });
  });
});

exports.audiHandle = functions.https.onRequest(audiHandle);
exports.contacts = functions.https.onRequest(contacts);
// exports.adminAPI = functions.https.onRequest(adminAPI);
