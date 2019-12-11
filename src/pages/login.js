import React, { useEffect } from 'react'
import * as firebaseui from 'firebaseui'
import { Redirect } from 'react-router-dom'

import { firebase } from 'utils/firebase'
import { useAuthentication } from 'hooks/authentication'

import 'firebaseui/dist/firebaseui.css'

const LoginPage = () => {
  const [currentUser, { loading }] = useAuthentication()

  useEffect(() => {
    const newUI = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())

    newUI.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.

          return false
        }
      },
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes: ['profile']
        }
      ]
      // Other config options...
    })
  }, [])

  if (!loading && currentUser) {
    return <Redirect to='/' />
  }
  else {
    return (
      <div id='firebaseui-auth-container' />
    )
  }
}

export default LoginPage
