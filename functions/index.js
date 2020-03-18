const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const contactData = [];

app.get('/ping', (req, res) => {
  res.send('working');
});

app.post('/api/form/contact', (req, res, next) => {
  const contactDataX = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };

  if (!contactDataX) {
    contactData.push(contactDataX);
    res.status(200).json(contactData);
  } else {
    res.status(500).json({
      message: "Error: Can't POST blank data"
    });
  }
});

exports.helloWorld = functions.https.onRequest(app);
