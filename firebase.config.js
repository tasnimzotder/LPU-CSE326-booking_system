var firebase = require('firebase');
const firebaseConfig = require('./secrets.firebase');

require('firebase/auth');
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);
console.log(`Firebase app name: ${firebase.app().name}`);

module.exports;
