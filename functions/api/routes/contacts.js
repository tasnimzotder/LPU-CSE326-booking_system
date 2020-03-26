const router = require('express').Router();
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
require('../../setup_firebase');

const db = admin.firestore().collection('contacts');

router.get('/', (req, res) => {
  cors(req, res, () => {
    db.get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        res.status(200).send(data);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        res.status(500).json({
          error: '${error}'
        });
      });
  });
});

router.post('/', (req, res) => {
  cors(req, res, () => {
    const data = {
      token: req.body['token'],
      name: req.body['name'],
      email: req.body['email'],
      message: req.body['message'],
      timestamp: admin.firestore.Timestamp.now()
    };

    if (data['token'] == 'sT=4#b&I1rArUP3Es5&wr4$h2cR#FrlS') {
      delete data.token;
      //   contacts.push(data);
      db.add(data)
        .then(res.status(200).send({ message: 'Success: request received' }))
        .catch(error => {
          console.log(`Error: database error > ${error}`);
          res.status(500).json({
            message: 'Error: database error'
          });
        });
    } else {
      res.status(500).json({
        message: 'Error: authentication error'
      });
    }
  });
});

module.exports = router;
