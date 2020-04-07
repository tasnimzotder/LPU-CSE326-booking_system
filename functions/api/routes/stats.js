const router = require('express').Router();
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

const db = admin.firestore().collection('stats');

let observer = admin
  .firestore()
  .collection('auditoriums')
  .onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (
        change.type == 'modified' ||
        change.type == 'added' ||
        change.type == 'removed'
      ) {
        let total_audis = 0;
        let total_seats = 0;
        let total_bookings = 0;

        admin
          .firestore()
          .collection('auditoriums')
          .get()
          .then((snapshot) => {
            total_audis = snapshot.size;
            snapshot.docs.map((doc) => {
              if (doc.data()['capacity']) {
                total_seats += Number(doc.data()['capacity']);
              }

              if (doc.data()['bookings']) {
                let bookings = doc.data()['bookings'];
                total_bookings += bookings.length;
                bookings.map((docX) => {
                  //   console.log(docX['date']);
                });
              }
            });
          })
          .then(() => {
            db.doc('5WQvwWobkc10PxFG0Ui7').update({
              count: admin.firestore.FieldValue.increment(+1),
              total_seats: total_seats,
              total_audis: total_audis,
              total_bookings: total_bookings,
            });
            // console.log('capacity', total_seats);
            // console.log('audis', total_audis);
          });

        // console.log(change.type, change.doc.data());
      }
    });
  });

router.get('/', (req, res) => {
  cors(req, res, () => {
    let data;
    db.get()
      .then((snapshot) => {
        data = snapshot.docs.map((doc) => {
          return { ...doc.data() };
        });
      })
      .then(() => {
        res.status(200).json(data[0]);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
});

module.exports = router;
