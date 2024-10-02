import { cn } from '@/lib/util/cn'
import { m, type Variants } from 'framer-motion'

const slideRightFullVariants: Variants = {
  open: {
    width: '100%',
    height: '100%',
    opacity: 1,
    visibility: 'visible',
    transition: { duration: 0.4, type: 'spring' },
  },
  closed: {
    width: '0',
    height: '0',
    opacity: 0,
    visibility: 'hidden',
    transition: { duration: 0.4, delay: 0.5, type: 'spring' },
  },
}

const SlideRightWrapper = ({
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
      variants={slideRightFullVariants}
      className={cn(
        'px-8 pb-10 pt-20',
        'w-full rounded-none',
        'bg-[#ffffff4b] backdrop-blur-[2rem]',
        'border-2 border-dotted border-green-500',
        'text fixed inset-0 h-screen w-screen bg-black'
      )}
    >
      {children}
    </m.div>
  )
}

export default SlideRightWrapper
