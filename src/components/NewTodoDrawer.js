import React, { useState } from 'react'
import { Drawer, Button, Fab, InputBase } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import firebaseApp, { firebase } from 'utils/firebase'
import { NEW_TODO_DRAWER_OPEN } from 'contexts/interface'
import { useAuthentication } from 'hooks/authentication'
import { useInterface } from 'hooks/interface'

const db = firebaseApp.firestore()

const useStyles = makeStyles(theme => ({
  paper: {
    borderTopLeftRadius: theme.spacing(),
    borderTopRightRadius: theme.spacing(),
    padding: theme.spacing(2)
  },

  fab: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2)
  },

  input: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(2)
  }
}))

const NewTodo = () => {
  const { fab, input, ...drawerClasses } = useStyles()
  const [text, setText] = useState('')

  const [state, { open, close }] = useInterface()
  const [currentUser] = useAuthentication()

  function handleTextChange (e) {
    setText(e.target.value)
  }

  function handleInputKeyUp (e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      handleSubmit()
    }
  }

  function handleSubmit () {
    if (text.trim() !== '') {
      db.collection(`users/${currentUser.uid}/todos`).add({
        text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        checked: false,
        visible: true
      })
    }

    setText('')
    handleClose()
  }

  function handleOpen () {
    open(NEW_TODO_DRAWER_OPEN)
  }

  function handleClose () {
    close(NEW_TODO_DRAWER_OPEN)
  }

  if (currentUser) {
    return (
      <>
        <Fab color='primary' aria-label='add' className={fab} onClick={handleOpen}>
          <AddIcon />
        </Fab>

        <Drawer anchor='bottom' open={state.newTodoDrawerOpen} onClose={handleClose} classes={drawerClasses}>
          <InputBase
            className={input}
            value={text}
            onChange={handleTextChange}
            onKeyUp={handleInputKeyUp}
            autoFocus
          />

          <Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>
            Add Todo
          </Button>
        </Drawer>
      </>
    )
  }

  return null
}

export default NewTodo
