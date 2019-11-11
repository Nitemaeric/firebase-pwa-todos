import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import 'firebaseui/dist/firebaseui.css'

import TopNavigation from './components/TopNavigation'
import TodoList from './components/TodoList'
import NewTodo from './components/NewTodo'
import AuthenticationDialog from './components/AuthenticationDialog'
import useVisibility from './hooks/useVisibility'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  },
  spacer: theme.mixins.toolbar
}))

const App = () => {
  const classes = useStyles()

  const [authDialogOpen, {
    handleOpen: handleAuthDialogOpen,
    handleClose: handleAuthDialogClose
  }] = useVisibility(false)

  return (
    <Container maxWidth='sm' className={classes.root}>
      <TopNavigation onClickLogin={handleAuthDialogOpen} />
      <div className={classes.spacer} />

      <TodoList />

      <NewTodo />
      <AuthenticationDialog open={authDialogOpen} onClose={handleAuthDialogClose} />
    </Container>
  )
}

export default App
