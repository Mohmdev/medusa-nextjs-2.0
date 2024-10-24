import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { User } from 'lucide-react'

const NavAccount = ({ className }: { className?: string }) => {
  return (
    <LocalizedClientLink
      href="/account"
      data-testid="nav-account-link"
      className={cn('text-secondary-foreground/90', className)}
    >
      <User size={24} className="" strokeWidth={1.5} />
    </LocalizedClientLink>
  )
}

export default NavAccount
