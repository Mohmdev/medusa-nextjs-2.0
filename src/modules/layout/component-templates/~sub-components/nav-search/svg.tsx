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
          className={cn(
            'text-secondary-foreground/90 hover:text-secondary-subtle focs:text-secondary-subtle transition-colors duration-150 ease-linear',
            className
          )}
        >
          <Search size={21} strokeWidth={1.5} />
        </LocalizedClientLink>
      )}
    </>
  )
}

export default NavSearch
