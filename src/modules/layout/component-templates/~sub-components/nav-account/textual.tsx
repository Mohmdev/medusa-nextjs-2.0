import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'

const NavAccount = ({ className }: { className?: string }) => {
  return (
    <LocalizedClientLink
      href="/account"
      data-testid="nav-account-link"
      className={cn('hover:text-ui-fg-base', className)}
    >
      Account
    </LocalizedClientLink>
  )
}

export default NavAccount
