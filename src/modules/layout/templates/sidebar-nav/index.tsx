'use client'
import { useEffect, useRef } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  motion,
  AnimatePresence,
  useCycle,
  SVGMotionProps,
} from 'framer-motion'
import { cn } from '@/lib/util/cn'
import classes from './index.module.scss'
import {
  menuWrapper,
  menuItems,
  menuItem,
  hamburgerTopLine,
  hamburgerMiddleLine,
  hamburgerBottomLine,
} from './animations'
import { itemIds, itemColors } from './data'

// A very basic abstraction for getting the dimensions of an element
const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth
      dimensions.current.height = ref.current.offsetHeight
    }
  }, [ref])

  return dimensions.current
}

export const SidebarNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <div className={classes.root}>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className={classes.navElement}
      >
        <motion.div
          ref={containerRef}
          custom={height}
          variants={menuWrapper}
          className={classes.menuWrapper}
        >
          {/* <AnimatePresence>
            {isOpen && ( */}
          <motion.ul
            //
            variants={menuItems}
            className={classes.menuItems}
          >
            {itemIds.map((i) => {
              const style = { border: `2px solid ${itemColors[i]}` }
              return (
                <motion.li
                  key={i}
                  variants={menuItem}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={classes.menuItem}
                >
                  <div className={classes.iconPlaceholder} style={style} />
                  <div className={classes.textPlaceholder} style={style} />
                </motion.li>
              )
            })}
          </motion.ul>
          {/* )}
          </AnimatePresence> */}
        </motion.div>

        <motion.button onClick={() => toggleOpen()} className={classes.toggleButton}>
          <svg width="23" height="23" viewBox="0 0 23 23">
            <Path variants={hamburgerTopLine} />
            <Path
              d="M 2 9.423 L 20 9.423"
              variants={hamburgerMiddleLine}
              transition={{ duration: 0.1 }}
            />
            <Path variants={hamburgerBottomLine} />
          </svg>
        </motion.button>
      </motion.nav>
    </div>
    // <LazyMotion features={domAnimation}>
    // </LazyMotion>
  )
}

interface PathProps extends SVGMotionProps<SVGPathElement> {}

const Path: React.FC<PathProps> = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    // stroke="hsl(var(--secondary-foreground))"
    stroke="purple"
    strokeLinecap="round"
    {...props}
  />
)
