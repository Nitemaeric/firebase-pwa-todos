import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyBinkXN47ZtM_LCQpqb9gr2WLGEwykomn8',
  authDomain: 'fir-pwa-todos.firebaseapp.com',
  databaseURL: 'https://fir-pwa-todos.firebaseio.com',
  projectId: 'fir-pwa-todos',
  storageBucket: 'fir-pwa-todos.appspot.com',
  messagingSenderId: '112051311471',
  appId: '1:112051311471:web:ced833a0a3f252187a8e9a',
  measurementId: 'G-FZL96E5W64'
}

const firebaseApp = firebase.initializeApp(config)

firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        window.alert('failed-precondition')
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        window.alert('unimplemented')
      }
  })

export {
  firebase
}

export default firebaseApp
