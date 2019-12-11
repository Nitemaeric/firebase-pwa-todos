import { useContext } from 'react'

import { InterfaceContext } from '../contexts/interface'

export const useInterface = (defaultValue) => {
  const [state, dispatch] = useContext(InterfaceContext)

  const open = (name) => {
    dispatch({
      type: 'OPEN',
      payload: name
    })
  }

  const close = (name) => {
    dispatch({
      type: 'CLOSE',
      payload: name
    })
  }

  return [state, { open, close }]
}
