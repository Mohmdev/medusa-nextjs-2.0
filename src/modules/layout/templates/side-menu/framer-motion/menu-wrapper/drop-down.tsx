import { cn } from '@/lib/util/cn'
import { m, type Variants } from 'framer-motion'

const dropdownVariants: Variants = {
  open: {
    width: '480px',
    height: '90dvh',
    opacity: 1,
    visibility: 'visible',
    transition: { duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: '0',
    height: '0',
    opacity: 0,
    visibility: 'hidden',
    transition: {
      duration: 0.5,
      delay: 0.35,
      type: 'tween',
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

const DropdownWrapper = ({
  initial,
  animate,
  children,
}: {
  initial: string
  animate: string
  children?: React.ReactNode
}) => {
  return (
    <m.div
      initial={initial}
      animate={animate}
      variants={dropdownVariants}
      className={cn(
        'px-8 pb-10 pt-20',
        'w-full rounded-none',
        'bg-[#ffffff4b] backdrop-blur-[2rem]',
        'border-2 border-dotted border-green-500',
        'absolute left-0 top-0'
      )}
    >
      {children}
    </m.div>
  )
}

export default DropdownWrapper
