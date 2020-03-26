const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });

const contactRoutes = require('./api/routes/contacts');
const auditoriumRoutes = require('./api/routes/auditoriums');

const audiHandle = express();

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

audiHandle.use('/contacts', contactRoutes);
audiHandle.use('/audis', auditoriumRoutes);

audiHandle.get('/', (req, res) => {
  cors(req, res, () => {
    res.status(200).json({
      message: 'Welcome to Auditorium Handle API',
      'GET /contacts': 'get all contacts',
      'POST /contacts': 'post a contact query',
      'GET /audis': 'get all auditorium data',
      'GET /audis/bookings': 'get all auditirium booking data',
      'POST /audis/bookings': 'booking an auditorium'
    });
  });
});

let bookings = [
  {
    name: 'Tasnim',
    born: 2000
  }
];

audiHandle.get('/bookings', (req, res) => {
  cors(req, res, () => {
    res.status(200).json(bookings);
  });
});

audiHandle.post('/bookings', (req, res) => {
  cors(req, res, () => {
    // const data = {
    //   auth: req.body['auth'],
    //   name: req.body['name'],
    //   born: req.body['born']
    // };
    // console.log(data);
    // if (data['auth'] === 'ytsacuyYDV^&DTNXxdbvd(*0') {
    //   delete data.auth;
    //   bookings.push(data);
    //   res.status(200).json('well done');
    // } else {
    //   res.status(400).json('bad request guy');
    // }
    bookings.push(req.body);
    res.status(200).json('well done');
    // bookings.push(data);
    console.log(bookings);
    // console.log(req.body["name"]);
    // res.status(200).json('well done');
  });
});

exports.audiHandle = functions.https.onRequest(audiHandle);
