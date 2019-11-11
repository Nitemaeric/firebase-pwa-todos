import { useState, useEffect } from 'react'

import { firebase } from '../utils/firebase'

const useAuthentication = (defaultValue) => {
  const [user, setUser] = useState()

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)
        setUser(user)
      } else {
        setUser(undefined)
      }
    })
  }, [])

  return user
}

export default useAuthentication
