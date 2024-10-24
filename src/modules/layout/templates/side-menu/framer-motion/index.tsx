'use client'
import { cn } from '@/lib/util/cn'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  useCycle,
} from 'framer-motion'

import MenuItems from './menu-items'
import MenuWrapper from './menu-wrapper'
import ToggleButton from './toggle-button'

const SideMenu = ({ className }: { className?: string }) => {
  const [menuState, toggleMenuState] = useCycle(false, true)

  return (
    // Root element
    // Height is defined here
    <div
      className={cn(
        'h-10',
        'flex flex-col items-center justify-center z-50',
        'box-content w-max max-w-[90vw]',
        'border-0 border-none',
        className
      )}
    >
      {/* Wrapper will be relative to this container */}
      <div className="relative box-border flex h-max w-max">
        <LazyMotion features={domAnimation}>
          <MenuWrapper
            initial="closed"
            animate={menuState ? 'open' : 'closed'}
            variant="slideUpFull"
          >
            <AnimatePresence>{menuState && <MenuItems />}</AnimatePresence>
          </MenuWrapper>
          <ToggleButton
            variant="svg"
            menuState={menuState}
            toggleMenuState={toggleMenuState}
          />
        </LazyMotion>
      </div>
    </div>
  )
}

export default SideMenu
