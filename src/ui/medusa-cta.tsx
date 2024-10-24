import { Text } from '@medusajs/ui'

import { cn } from '@/lib/util/cn'
import Medusa from '@/modules/common/icons/medusa'
import NextJs from '@/modules/common/icons/nextjs'

const MedusaCTA = ({ className }: { className?: string }) => {
  return (
    <Text
      className={cn(
        'txt-compact-small-plus flex items-center gap-x-2 text-[#9ca3af]',
        className
      )}
    >
      Powered by
      <a href="https://www.medusajs.com" target="_blank" rel="noreferrer">
        <Medusa fill="#9ca3af" className="fill-[#9ca3af]" />
      </a>
      &
      <a href="https://nextjs.org" target="_blank" rel="noreferrer">
        <NextJs fill="#9ca3af" />
      </a>
    </Text>
  )
}

export default MedusaCTA
