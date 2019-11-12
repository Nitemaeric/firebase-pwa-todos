import { useState, useEffect } from 'react'

import firebaseApp, { firebase } from '../utils/firebase'

const db = firebaseApp.firestore()

const useAuthentication = (defaultValue) => {
  const [user, setUser] = useState()

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        setUser(user)
        const { uid, displayName, email, photoURL } = user

        db.doc(`users/${uid}`).update({
          uid, displayName, email, photoURL
        })
        .catch(error => {
          console.log(error.code)
          if (error.code === 'not-found') {
            db.doc(`users/${uid}`).set({
              uid, displayName, email, photoURL
            })
            .then(snapshot => {
              db.collection(`users/${uid}/todos`).add({
                text: 'This is an example Todo. Add more by clicking the button below',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                checked: false,
                visible: true
              })
            })
          }
        })
      } else {
        setUser(undefined)
      }
    })
  }, [])

  return user
}

export default useAuthentication
