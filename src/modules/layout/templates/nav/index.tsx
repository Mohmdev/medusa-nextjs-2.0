import { Suspense } from 'react'

import { listRegions } from '@/lib/data/regions'
import { StoreRegion } from '@medusajs/types'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import CartButton from '@/modules/layout/components-shared/cart-button'
import SideMenu from '@/modules/layout/templates/nav/side-menu'
import { cn } from '@/lib/util/cn'
import SiteLogo from '@/ui/site-logo'
import Medusa from '@/modules/common/icons/medusa'

export default async function Nav({ className }: { className?: string }) {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Medusa Store'

  return (
    <header
      className={cn(
        'group sticky inset-x-0 top-0 z-50',
        'mx-auto h-16 w-full duration-200',
        'border-b border-border bg-background',
        className
      )}
    >
      <nav className="content-container text-small-regular txt-xsmall-plus flex h-full w-full items-center justify-between text-ui-fg-subtle">
        <div className="flex h-full flex-1 basis-0 items-center">
          <div className="h-full">
            <SideMenu regions={regions} />
          </div>
        </div>

        <LocalizedClientLink
          href="/"
          data-testid="nav-store-link"
          className="flex h-full items-center"
        >
          <SiteLogo
            text={storeName}
            textClassName="text-ui-fg-subtle"
            svgComponent={<Medusa color="var(--fg-subtle)" size="22" />}
          />
        </LocalizedClientLink>

        <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
          <div className="hidden h-full items-center gap-x-6 small:flex">
            {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/search"
                scroll={false}
                data-testid="nav-search-link"
              >
                Search
              </LocalizedClientLink>
            )}
            <LocalizedClientLink
              className="hover:text-ui-fg-base"
              href="/account"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
          </div>
          <Suspense
            fallback={
              <LocalizedClientLink
                className="flex gap-2 hover:text-ui-fg-base"
                href="/cart"
                data-testid="nav-cart-link"
              >
                Cart (0)
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
        </div>
      </nav>
    </header>
  )
}
