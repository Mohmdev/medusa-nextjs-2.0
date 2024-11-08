"use client"

import React, { createContext, useContext } from "react"

interface ModalContextInterface {
  close: () => void
}

const ModalContext = createContext<ModalContextInterface | null>(null)

interface ModalProviderProps {
  children?: React.ReactNode
  closeAction: () => void
}

export const ModalProvider = ({
  children,
  closeAction,
}: ModalProviderProps) => {
  return (
    <ModalContext.Provider
      value={{
        close: closeAction,
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
