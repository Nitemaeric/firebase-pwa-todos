import React, { useState, useEffect } from 'react'
import {
  Drawer, Button, Fab, InputBase, InputAdornment, IconButton,
  LinearProgress
} from '@material-ui/core'
import { Add as AddIcon, AttachFile as AttachFileIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import firebaseApp, { firebase } from 'utils/firebase'
import { NEW_TODO_DRAWER_OPEN } from 'contexts/interface'
import { useAuthentication } from 'hooks/authentication'
import { useInterface } from 'hooks/interface'

const db = firebaseApp.firestore()
const storage = firebaseApp.storage()

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
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(2)
  },

  linearProgress: {
    marginBottom: theme.spacing(1)
  }
}))

const NewTodo = () => {
  const { fab, input, linearProgress, ...drawerClasses } = useStyles()
  const [text, setText] = useState('')
  const [uploadTask, setUploadTask] = useState()
  const [fileUrl, setFileUrl] = useState()
  const [progress, setProgress] = useState(0)

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
      let data = {
        text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        checked: false,
        visible: true
      }

      if (fileUrl) {
        data = { ...data, fileUrl }
      }

      db.collection(`users/${currentUser.uid}/todos`).add(data)
    }

    setText('')
    setProgress(0)
    handleClose()
  }

  function handleOpen () {
    open(NEW_TODO_DRAWER_OPEN)
  }

  function handleClose () {
    close(NEW_TODO_DRAWER_OPEN)
  }

  function handleFile (e) {
    const file = e.target.files[0]

    setUploadTask(storage.ref().child(`${currentUser.id}/${file.name}`).put(file))
  }

  useEffect(() => {
    if (uploadTask) {
      return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(progress)
        },
        error => {

        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setFileUrl(downloadURL)
          })
        }
      )
    }
  }, [uploadTask])

  if (currentUser) {
    return (
      <>
        <Fab color='primary' aria-label='add' className={fab} onClick={handleOpen}>
          <AddIcon />
        </Fab>

        <Drawer anchor='bottom' open={state.newTodoDrawerOpen} onClose={handleClose} classes={drawerClasses}>
          {
            <LinearProgress variant='determinate' value={progress} className={linearProgress} />
          }

          <InputBase
            className={input}
            value={text}
            onChange={handleTextChange}
            onKeyUp={handleInputKeyUp}
            autoFocus
            fullWidth
            startAdornment={
              <InputAdornment position='start'>
                <input
                  accept='image/*'
                  id='icon-button-photo'
                  onChange={handleFile}
                  type='file'
                  style={{ display: 'none' }}
                />
                <label htmlFor='icon-button-photo'>
                  <IconButton component='span'>
                    <AttachFileIcon />
                  </IconButton>
                </label>
              </InputAdornment>
            }
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
