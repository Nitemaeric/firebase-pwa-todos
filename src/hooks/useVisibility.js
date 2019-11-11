import { useState } from 'react'

const useVisibility = (defaultValue) => {
  const [visible, setVisible] = useState(defaultValue)

  function handleOpen () {
    setVisible(true)
  }

  function handleClose () {
    setVisible(false)
  }

  return [visible, { handleOpen, handleClose }]
}

export default useVisibility
