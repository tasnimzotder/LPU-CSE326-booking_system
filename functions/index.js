const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const bodyParser = require('body-parser');
const serviceAccount = require('./secrets/ServiceAccountKey.json');

const audiHandle = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lpu-cse-326-booking-system.firebaseio.com'
});

let db = admin.firestore();

audiHandle.get('/getAll', (req, res) => {
  cors(req, res, () => {
    db.collection('auditoriums')
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        res.send(data);
      })
      .catch(error => {
        console.log(`Error (/getAll): ${error}`);
        res.status(500).send(error);
      });
  });
});

exports.audiHandle = functions.https.onRequest(audiHandle);