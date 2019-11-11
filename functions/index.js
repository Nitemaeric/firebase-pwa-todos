const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!")
// })

exports.reminderJob = functions.pubsub.schedule('every day').onRun(async context => {
  const snapshot = await db.collection('todos').get()

  admin.messaging().send({
    
  })

  return null
})
