import React from 'react'

import { useAuthentication } from 'hooks/authentication'
import TodoList from 'components/TodoList'
import NewTodoDrawer from 'components/NewTodoDrawer'

const MainPage = () => {
  const [currentUser] = useAuthentication()

  if (currentUser) {
    return (
      <>
        <TodoList />
        <NewTodoDrawer />
      </>
    )
  }
  else {
    return null
  }
}

export default MainPage
