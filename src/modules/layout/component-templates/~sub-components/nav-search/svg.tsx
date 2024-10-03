import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { Search } from 'lucide-react'

const NavSearch = ({ className }: { className?: string }) => {
  return (
    <>
      {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
        <LocalizedClientLink
          href="/search"
          scroll={false}
          data-testid="nav-search-link"
          className={cn('hover:text-ui-fg-base', className)}
        >
          <Search size={22} />
        </LocalizedClientLink>
      )}
    </>
  )
}

export default NavSearch
