import { m, type Variants } from 'framer-motion'
import { cn } from '@/lib/util/cn'

const drawerVariants: Variants = {
  open: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '480px',
    height: '90dvh',
    opacity: 1,
    visibility: 'visible',
    transition: { duration: 0.4, type: 'spring' },
  },
  closed: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '0',
    height: '0',
    opacity: 0,
    visibility: 'hidden',
    transition: { duration: 0.4, delay: 0.5, type: 'spring' },
  },
}

const DrawerWrapper = ({
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
      variants={drawerVariants}
      className={cn(
        'px-8 pb-10 pt-20',
        'w-full rounded-none',
        'bg-[#ffffff4b] backdrop-blur-[2rem]',
        'border-2 border-dotted border-green-500',
        'fixed inset-x-0 inset-y-4'
      )}
    >
      {children}
    </m.div>
  )
}

export default DrawerWrapper
