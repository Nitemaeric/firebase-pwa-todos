import React, { useState, useEffect } from 'react'
import {
  List, ListItem, ListItemIcon, ListItemText, Checkbox, Collapse
} from '@material-ui/core'

import firebaseApp from '../utils/firebase'

const db = firebaseApp.firestore()

const TodoList = () => {
  const [todos, setTodos] = useState([])
  let clearTimeout

  function handleClick (todo) {
    return (e) => {
      db.doc(`todos/${todo.id}`).update({ checked: !todo.checked })
        .then(() => {
          clearTimeout = setTimeout(() => {
            db.doc(`todos/${todo.id}`).update({ visible: false })
          }, 500)
        })
    }
  }

  useEffect(() => {
    return clearTimeout
  }, [clearTimeout])

  useEffect(() => {
    return db.collection('todos')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const newTodos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        setTodos(newTodos)
      })
  }, [])

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
