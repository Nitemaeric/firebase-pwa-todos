import React, { useReducer } from 'react'

export const AUTH_DIALOG_OPEN = 'authDialogOpen'
export const NEW_TODO_DRAWER_OPEN = 'newTodoDrawerOpen'
export const UNDO_SNACKBAR_OPEN = 'undoSnackbarOpen'

export const InterfaceContext = React.createContext()

export const InterfaceProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'OPEN':
        return {
          ...state,
          [action.payload]: true
        }

      case 'CLOSE':
        return {
          ...state,
          [action.payload]: false
        }

      default:
        return state
    }
  }

  const initialState = {
    [AUTH_DIALOG_OPEN]: false,
    [NEW_TODO_DRAWER_OPEN]: false
  }

  return (
    <InterfaceContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </InterfaceContext.Provider>
  )
}
