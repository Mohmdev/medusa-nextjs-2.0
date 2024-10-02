import { cn } from '@/lib/util/cn'
import { m, type Variants } from 'framer-motion'

const slideUpFullVariants: Variants = {
  open: {
    top: '0',
    left: '0',
    backdropFilter: 'blur(2rem)',
    height: '100dvh',
    // opacity: 1,
    // visibility: 'visible',
    transition: { duration: 0.3, type: 'spring', stiffness: 100, damping: 20 },
  },
  closed: {
    top: '100%',
    left: '0',
    backdropFilter: 'blur(2rem)',
    height: '100dvh',
    // opacity: 0,
    // visibility: 'hidden',
    transition: {
      duration: 0.3,
      delay: 0.3,
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

const SlideUpWrapper = ({
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
      variants={slideUpFullVariants}
      className={cn(
        'fixed',
        'bg-black/50 pb-10 pt-[20vh]',
        'w-screen',
        'h-[100vh] backdrop-blur-[2rem]' // fallback
      )}
      // MotionStyle={{ height: '100vh, 100dvh' }}
    >
      <div className="content-container flex h-full flex-col items-start gap-4 *:*:*:*:*:text-secondary-foreground">
        {children}
      </div>
    </m.div>
  )
}

export default SlideUpWrapper
