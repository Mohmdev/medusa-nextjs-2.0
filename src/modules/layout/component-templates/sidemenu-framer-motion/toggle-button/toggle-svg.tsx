import { cn } from '@/lib/util/cn'
import { m, type SVGMotionProps } from 'framer-motion'

interface PathProps extends SVGMotionProps<SVGPathElement> {
  menuState: boolean
}

const hamburgerTopLine = {
  closed: {
    // top line
    d: 'M 2 2.5 L 20 2.5',
  },
  open: {
    // rotates and moves to form the top part of the X
    d: 'M 3 16.5 L 17 2.5',
  },
}

const hamburgerMiddleLine = {
  // middle line fade in and out
  closed: { opacity: 1 },
  open: { opacity: 0 },
}

const hamburgerBottomLine = {
  closed: {
    // bottom line
    d: 'M 2 16.346 L 20 16.346',
  },
  open: {
    // rotates and moves to form the bottom part of the X
    d: 'M 3 2.5 L 17 16.346',
  },
}

const ToggleSVG = ({
  menuState,
  toggleMenuState,
}: {
  menuState: boolean
  toggleMenuState: () => void
}) => {
  // const [isOpen, toggleOpen] = useCycle(false, true)
  return (
    <m.button
      onClick={() => toggleMenuState()}
      className={cn(
        'z-50 h-max w-max',
        'm-0 mt-1 border-0 p-0',
        'cursor-pointer select-none outline-0'
      )}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path variants={hamburgerTopLine} menuState={menuState} />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={hamburgerMiddleLine}
          transition={{ duration: 0.1 }}
          menuState={menuState}
        />
        <Path variants={hamburgerBottomLine} menuState={menuState} />
      </svg>
    </m.button>
  )
}
const Path: React.FC<PathProps> = ({ menuState, ...props }) => (
  <m.path
    strokeWidth="2"
    stroke="var(--fg-subtle)"
    // stroke="hsl(var(--secondary-foreground))"
    strokeLinecap="round"
    animate={menuState ? 'open' : 'closed'}
    {...props}
  />
)

export default ToggleSVG
