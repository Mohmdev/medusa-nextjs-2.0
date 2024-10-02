import React from 'react'
import DrawerWrapper from './drawer'
import DropdownWrapper from './drop-down'
import SlideRightWrapper from './slide-right'
import SlideUpWrapper from './slide-up'

const MenuWrapper = ({
  initial,
  animate,
  children,
  variant = 'dropdown',
}: {
  initial: string
  animate: string
  children?: React.ReactNode
  variant?: 'dropdown' | 'slideUpFull' | 'drawer' | 'slideRightFull'
}) => {
  switch (variant) {
    case 'dropdown':
      return (
        <DropdownWrapper initial={initial} animate={animate}>
          {children}
        </DropdownWrapper>
      )
    case 'slideUpFull':
      return (
        <SlideUpWrapper initial={initial} animate={animate}>
          {children}
        </SlideUpWrapper>
      )
    case 'slideRightFull':
      return (
        <SlideRightWrapper initial={initial} animate={animate}>
          {children}
        </SlideRightWrapper>
      )
    case 'drawer':
      return (
        <DrawerWrapper initial={initial} animate={animate}>
          {children}
        </DrawerWrapper>
      )
    default:
      return null
  }
}

export default MenuWrapper
