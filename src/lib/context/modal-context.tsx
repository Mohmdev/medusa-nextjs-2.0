"use client"

import React, { createContext, useContext } from "react"

interface IModalContext {
  close: () => void
}

const ModalContext = createContext<IModalContext | null>(null)

interface ModalProviderProps {
  children?: React.ReactNode
  close: () => void
  onClose?: () => void
}

export const ModalProvider = ({ children, close }: ModalProviderProps) => {
  return (
    <ModalContext.Provider
      value={{
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === null) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
