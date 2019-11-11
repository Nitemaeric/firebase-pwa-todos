import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogActions, DialogTitle,
  Button
} from '@material-ui/core'
import * as firebaseui from 'firebaseui'

import { firebase } from '../utils/firebase'

const AuthenticationDialog = ({ open, onClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open && visible) {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())

      ui.start('#firebaseui-auth-container', {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
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
    }
  }, [open, visible])

  return (
    <Dialog
      open={open}
      fullScreen
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      onEntered={() => {
        setVisible(true)
      }}
      onExiting={() => {
        setVisible(false)
      }}
    >
      <DialogTitle id='form-dialog-title'>Sign In</DialogTitle>
      <div id='firebaseui-auth-container' style={{ flex: 1, display: 'flex', alignItems: 'center' }} />

      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthenticationDialog
