const router = require('express').Router();
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
require('../../setup_firebase');

const db = admin.firestore().collection('auditoriums');

router.get('/', (req, res) => {
  cors(req, res, () => {
    db.get().then(snapshot => {
      const data = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      res.status(200).send(data);
    });
  });
});

router.post('/bookings', (req, res) => {
  cors(req, res, () => {
    res.status(200).json({
      message: 'working'
    });
  });
});

module.exports = router;
