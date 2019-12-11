import React, { useState, useEffect } from 'react'
import {
  List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Checkbox,
  Collapse, Snackbar, Button, IconButton
} from '@material-ui/core'
import { Visibility as VisibilityIcon } from '@material-ui/icons'
import Carousel, { ModalGateway, Modal } from 'react-images'

import firebaseApp from 'utils/firebase'
import { useAuthentication } from 'hooks/authentication'

const db = firebaseApp.firestore()

const TodoList = () => {
  const [currentUser] = useAuthentication()
  const [todos, setTodos] = useState([])
  const [clickedTodo, setClickedTodo] = useState()
  const [visibleTodo, setVisibleTodo] = useState()

  function handleClick (todo) {
    return (e) => {
      setClickedTodo(todo)

      db.doc(`users/${currentUser.uid}/todos/${todo.id}`).update({
        checked: true,
        visible: false
      })
    }
  }

  function handleView (todo) {
    return (e) => {
      setVisibleTodo(todo)
    }
  }

  function handleClose () {
    setClickedTodo(null)
  }

  function handleCloseModal () {
    setVisibleTodo(null)
  }

  function handleUndo () {
    if (clickedTodo) {
      db.doc(`users/${currentUser.uid}/todos/${clickedTodo.id}`).update({
        checked: false,
        visible: true
      })

      setClickedTodo(null)
    }
  }

  useEffect(() => {
    if (currentUser) {
      return db.collection(`users/${currentUser.uid}/todos`)
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          const newTodos = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))

          setTodos(newTodos)
        })
    }
  }, [currentUser])

  return (
    <>
      <List>
        {
          todos.map(todo => {
            return (
              <Collapse in={todo.visible} key={todo.id}>
                <ListItem button onClick={handleClick(todo)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={todo.checked}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={todo.text} />
                  {
                    todo.fileUrl && (
                      <ListItemSecondaryAction>
                        <IconButton edge='end' onClick={handleView(todo)}>
                          <VisibilityIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
              </Collapse>
            )
          })
        }
      </List>

      <ModalGateway>
        {
          !!visibleTodo ? (
            <Modal closeOnBackdropClick onClose={handleCloseModal}>
              <Carousel views={[{ src: visibleTodo.fileUrl }]} onClick={() => console.log('clicked')} />
            </Modal>
          ) : null
        }
      </ModalGateway>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!clickedTodo}
        onClose={handleClose}
        message='Todo completed'
        action={
          <Button
            color='primary'
            size='small'
            onClick={handleUndo}
          >
            UNDO
          </Button>
        }
      />
    </>
  )
}

export default TodoList
