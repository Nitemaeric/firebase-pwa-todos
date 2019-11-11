import React, { useState } from 'react'
import {
  AppBar, Toolbar, Typography, Button, IconButton, Avatar,
  Menu, MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { firebase } from '../utils/firebase'
import useAuthentication from '../hooks/useAuthentication'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

const TopNavigation = ({ onClickLogin }) => {
  const classes = useStyles()
  const user = useAuthentication()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    setAnchorEl(null)
  }

  return (
    <AppBar position='fixed' className={classes.root}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          <span role='img' aria-label='Fire'>🔥</span> Todo List
        </Typography>

        {
          user ? (
            <IconButton
              edge='end'
              aria-label='account of current user'
              // aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <Avatar
                src={user.photoURL}
                style={{ height: '32px', width: '32px' }}
              />
            </IconButton>
          ) : (
            <Button color='inherit' onClick={onClickLogin}>Sign In</Button>
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
  )
}

export default TopNavigation
