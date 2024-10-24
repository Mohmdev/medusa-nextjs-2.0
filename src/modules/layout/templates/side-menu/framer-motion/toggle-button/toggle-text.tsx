import { cn } from '@/lib/util/cn'
import { m } from 'framer-motion'

const ToggleText = ({
  menuState,
  toggleMenuState,
}: {
  menuState: boolean
  toggleMenuState: () => void
}) => {
  return (
    <div
      className={cn(
        'h-full w-max rounded-xl',
        'box-border cursor-pointer overflow-hidden'
        // 'border-4 border-blue-500'
      )}
    >
      <m.div
        className={cn(
          'relative box-border h-full w-max font-medium',
          '*:h-full *:w-full' // chilren
        )}
        animate={{ top: menuState ? '-100%' : '0%' }}
        transition={{
          duration: 0.5,
          type: 'tween',
          ease: [0.76, 0, 0.24, 1], // easeInOutQuart
          // ease: [0.83, 0, 0.17, 1], // easeInOutQuint
        }}
      >
        <button
          className="bg-[#c9fd74] text-[#000000]"
          // onClick={() => {
          //   toggleMenuState()
          // }}
          onClick={() => toggleMenuState()}
        >
          Menu
        </button>
        <button
          className="bg-[#000000] text-[#c9fd74]"
          // onClick={() => {
          //   toggleMenuState()
          // }}
          onClick={() => toggleMenuState()}
        >
          Close
        </button>
      </m.div>
    </div>
  )
}

export default ToggleText
