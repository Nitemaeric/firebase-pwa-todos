import React, { useState, useEffect } from 'react'
import {
  List, ListItem, ListItemIcon, ListItemText, Checkbox, Collapse
} from '@material-ui/core'

import firebaseApp from '../utils/firebase'
import useAuthentication from '../hooks/useAuthentication'

const db = firebaseApp.firestore()

const TodoList = () => {
  const user = useAuthentication()
  const [todos, setTodos] = useState([])
  let clearTimeout

  function handleClick (todo) {
    return (e) => {
      db.doc(`users/${user.uid}/todos/${todo.id}`).update({ checked: !todo.checked })
        .then(() => {
          clearTimeout = setTimeout(() => {
            db.doc(`users/${user.uid}/todos/${todo.id}`).update({ visible: false })
          }, 300)
        })
    }
  }

  useEffect(() => {
    return clearTimeout
  }, [clearTimeout])

  useEffect(() => {
    if (user) {
      return db.collection(`users/${user.uid}/todos`)
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const newTodos = snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))

        setTodos(newTodos)
      })
    }
  }, [user])

  return (
    <List>
      {todos.map(todo => {
        const labelId = `checkbox-list-label-${todo.id}`

        return (
          <Collapse in={todo.visible} key={todo.id}>
            <ListItem button onClick={handleClick(todo)}>
              <ListItemIcon>
                <Checkbox
                  checked={todo.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={todo.text} />
            </ListItem>
          </Collapse>
        )
      })}
    </List>
  )
}

export default TodoList
