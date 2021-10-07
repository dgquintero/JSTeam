const admin = require('firebase-admin');

var serviceAccount = require("../../jsteam-prueba-firebase-adminsdk-rd4ra-957b8f9302.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://jsteam-prueba-default-rtdb.firebaseio.com/'
})

const db = admin.database();

module.exports = db
