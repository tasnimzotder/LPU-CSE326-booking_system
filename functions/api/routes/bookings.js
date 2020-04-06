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
    db.get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            name: doc.data()['name'],
            bookings: doc.data()['bookings']
          };
        });
        res.status(200).send(data);
      })
      .catch(error => {
        res.status(500).json({
          error: error
        });
        console.log(`Error: ${error}`);
      });
  });
});

router.post('/', (req, res) => {
  cors(req, res, () => {
    if (req.body['token'] == 'sT=4#b&I1rArUP3Es5&wr4$h2cR#FrlS') {
      let booking = {
        xid: req.body['xid'],
        name: req.body['name'],
        department: req.body['department'],
        purpose: req.body['purpose'],
        person_in_charge: req.body['person_in_charge'],
        contact_number: req.body['contact_number'],
        xuid: req.body['xuid'],
        booking_type: req.body['booking_type'],
        date: req.body['date']
      };

      // bookings.push(booking);
      db.doc(booking['xid'])
        .update({
          bookings: admin.firestore.FieldValue.arrayUnion(booking)
        })
        .then(() => {
          res.status(200).json({
            message: 'well done'
          });
          console.log(booking);
        })
        .catch(error => {
          res.status(500).json({
            message: error
          });
        });
    } else {
      res.status(500).json({
        message: 'authentication fail'
      });
    }
  });
});

module.exports = router;
