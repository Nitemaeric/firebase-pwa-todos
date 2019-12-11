import React, { useState, useEffect } from 'react'
import {
  List, ListItem, ListItemIcon, ListItemText, Checkbox, Collapse,
  Snackbar, Button
} from '@material-ui/core'

import firebaseApp from 'utils/firebase'
import { useAuthentication } from 'hooks/authentication'

const db = firebaseApp.firestore()

const TodoList = () => {
  const [currentUser] = useAuthentication()
  const [todos, setTodos] = useState([])
  const [clickedTodo, setClickedTodo] = useState()

  function handleClick (todo) {
    return (e) => {
      setClickedTodo(todo)

      db.doc(`users/${currentUser.uid}/todos/${todo.id}`).update({
        checked: true,
        visible: false
      })
    }
  }

  function handleClose () {
    setClickedTodo(null)
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
                </ListItem>
              </Collapse>
            )
          })
        }
      </List>

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
