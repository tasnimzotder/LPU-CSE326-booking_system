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
        let available_seats = 0;

        admin
          .firestore()
          .collection('auditoriums')
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              if (doc.data()['capacity']) {
                total_seats = total_seats + Number(doc.data()['capacity']);
              }
            });
          })
          .then(() => {
            db.doc('5WQvwWobkc10PxFG0Ui7').update({
              count: admin.firestore.FieldValue.increment(+1),
              total_seats: total_seats,
            });
            console.log('capacity', total_seats);
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
          return doc.data();
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
