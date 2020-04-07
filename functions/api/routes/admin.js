const router = require('express').Router();
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

const dbAdmin = admin.firestore().collection('admin');
const dbContact = admin.firestore().collection('contacts');
const dbAudi = admin.firestore().collection('auditoriums');

router.get('/admin', (req, res) => {
  cors(req, res, () => {
    let data;
    dbAdmin
      .get()
      .then((snap) => {
        data = snap.docs.map((doc) => {
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
