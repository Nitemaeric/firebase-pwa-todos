import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuthentication } from 'hooks/authentication'

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const [currentUser, { loading }] = useAuthentication()

  if (loading) {
    return null
  }

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default AuthenticatedRoute
