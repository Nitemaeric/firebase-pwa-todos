import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { InterfaceProvider } from 'contexts/interface'
import TopNavigation from 'components/TopNavigation'
import AuthenticatedRoute from 'components/AuthenticatedRoute'

import MainPage from 'pages'
import LoginPage from 'pages/login'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <InterfaceProvider>
      <Router>
        <Container maxWidth='sm' className={classes.root}>
          <TopNavigation />

          <Switch>
            <Route path='/login' component={LoginPage} />
            <AuthenticatedRoute path='/' component={MainPage} />
          </Switch>
        </Container>
      </Router>
    </InterfaceProvider>
  )
}

export default App
