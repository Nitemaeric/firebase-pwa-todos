import React, { useState } from 'react'
import {
  AppBar, Toolbar, Typography, Button, IconButton, Avatar,
  Menu, MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { firebase } from 'utils/firebase'
import { useAuthentication } from 'hooks/authentication'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1
  },
  title: {
    flexGrow: 1
  },
  spacer: theme.mixins.toolbar
}))

const TopNavigation = () => {
  const classes = useStyles()
  const [currentUser] = useAuthentication()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar position='fixed' className={classes.root}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <span role='img' aria-label='Fire'>🔥</span> Todo List
          </Typography>

          {
            currentUser ? (
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <Avatar
                  src={currentUser.photoURL}
                  style={{ height: '32px', width: '32px' }}
                />
              </IconButton>
            ) : (
              <Button color='inherit' component={Link} to='/login'>Login</Button>
            )
          }

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!anchorEl}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <div className={classes.spacer} />
    </>
  )
}

export default TopNavigation
