import React, { createContext,useState } from 'react'

export const modalContext = createContext()

const ModalProvider = ({children}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setOpen2] = useState(false)
  return (

    <modalContext.Provider value={{isOpen, setIsOpen, isOpen2, setOpen2}}>
        {children}
    </modalContext.Provider>
  )
}

export default ModalProvider