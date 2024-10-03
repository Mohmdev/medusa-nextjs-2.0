import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'

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
          Search
        </LocalizedClientLink>
      )}
    </>
  )
}

export default NavSearch
