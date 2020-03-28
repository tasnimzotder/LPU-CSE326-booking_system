const router = require('express').Router();
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
require('../../setup_firebase');

const db = admin.firestore().collection('auditoriums');

let bookings = [
  {
    name: 'Tasnim',
    born: 2000
  }
];

router.get('/', (req, res) => {
  cors(req, res, () => {
    res.status(200).json(bookings);
  });
});

router.post('/', (req, res) => {
  cors(req, res, () => {
    // bookings.push(req.body);
    // res.status(200).json('well done');
    // console.log(bookings);
    if (req.body['token'] == 'sT=4#b&I1rArUP3Es5&wr4$h2cR#FrlS') {
      let booking = {
        xid: req.body['xid'],
        department: req.body['department'],
        purpose: req.body['purpose'],
        person_in_charge: req.body['person_in_charge'],
        contact_number: req.body['contact_number'],
        xuid: req.body['xuid'],
        booking_type: req.body['booking_type'],
        date: req.body['date']
      };
      res.status(200).json({
        message: 'well done'
      });
      console.log(booking);
      bookings.push(booking);
    } else {
      res.status(500).json({
        message: 'bad request'
      });
    }
  });
});

module.exports = router;
