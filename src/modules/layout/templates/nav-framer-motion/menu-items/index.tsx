import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import ModeToggle from '@/ui/mode-toggle/toggle'
import { m } from 'framer-motion'
import RegionSelectDropdown from '../components/region-select-dropdown'
import { footerLinks, links } from '../data'

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: '80px',
    translateX: '-20px',
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      // prettier-ignore
      delay: 0.35 + (i * 0.1),
      ease: [0.215, 0.61, 0.355, 1],
      // prettier-ignore
      opacity: { duration: 0.35, delay: 0.35 + (i * 0.15) },
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      type: 'linear',
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      // prettier-ignore
      delay: 0.75 + (i * 0.1),
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: 'tween', ease: 'easeInOut' },
  },
}

const MenuItems = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-between">
      {/* Body */}
      <div className="flex flex-col gap-6">
        {links.map((link, i) => {
          const { title, href, dataTestId } = link
          return (
            <div
              key={`b_${i}`}
              // Optional
              // style={{ perspective: '7rem', perspectiveOrigin: 'bottom' }}
            >
              <m.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <LocalizedClientLink
                  href={href}
                  data-testid={dataTestId}
                  className="text-3xl font-normal text-black"
                >
                  {title}
                </LocalizedClientLink>
              </m.div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <m.div
        className={cn(
          'w-full',
          'flex flex-col items-start justify-between gap-2'
          // 'box-content border-4 border-dashed border-green-600/70'
        )}
      >
        {/* Mode Toggle */}
        <ModeToggle size={18} />
        {/* Social links */}
        <div className="mb-3 flex flex-wrap">
          {footerLinks.map((link, i) => {
            const { title, href, dataTestId } = link
            return (
              <m.div
                variants={slideIn}
                custom={i}
                initial="initial"
                animate="enter"
                exit="exit"
                key={`f_${i}`}
                className="mt-1 w-1/2"
              >
                <LocalizedClientLink href={href} data-testid={dataTestId}>
                  {title}
                </LocalizedClientLink>
              </m.div>
            )
          })}
        </div>
        <RegionSelectDropdown width="12rem" />
      </m.div>
    </div>
  )
}

export default MenuItems
