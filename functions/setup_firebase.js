const admin = require('firebase-admin');
const serviceAccount = require('./secrets/ServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lpu-cse-326-booking-system.firebaseio.com'
});

module.exports;
