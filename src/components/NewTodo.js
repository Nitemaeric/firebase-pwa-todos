import React, { useState } from 'react'
import { Drawer, Button, Fab } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import firebaseApp, { firebase } from '../utils/firebase'
import useVisibility from '../hooks/useVisibility'

const db = firebaseApp.firestore()

const useStyles = makeStyles(theme => ({
  paper: {
    // minHeight: '75vh',
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
    border: '1px solid #ECEFF1',
    padding: theme.spacing(),
    marginBottom: theme.spacing(2)
  }
}))

const NewTodo = () => {
  const { fab, input, ...drawerClasses } = useStyles()
  const [text, setText] = useState('')

  const [open, { handleOpen, handleClose }] = useVisibility(false)

  function handleTextChange (e) {
    setText(e.target.value)
  }

  function handleClick () {
    if (text.trim() !== '') {
      db.collection('todos').add({
        text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        checked: false,
        visible: true
      })
    }

    setText('')
    handleClose()
  }

  return (
    <>
      <Fab color='primary' aria-label='add' className={fab} onClick={handleOpen}>
        <AddIcon />
      </Fab>

      <Drawer anchor='bottom' open={open} onClose={handleClose} classes={drawerClasses}>
        <input
          type='text'
          className={input}
          value={text}
          onChange={handleTextChange}
          autoFocus
        />

        <Button variant='contained' color='primary' fullWidth onClick={handleClick}>
          Add Todo
        </Button>
      </Drawer>
    </>
  )
}

export default NewTodo
