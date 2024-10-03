import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { User } from 'lucide-react'

const NavAccount = ({ className }: { className?: string }) => {
  return (
    <LocalizedClientLink
      href="/account"
      data-testid="nav-account-link"
      className={cn('hover:text-ui-fg-base', className)}
    >
      <User size={26} />
    </LocalizedClientLink>
  )
}

export default NavAccount
