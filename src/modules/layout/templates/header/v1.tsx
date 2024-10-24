// import { enrichLineItems, retrieveCart } from '@/lib/data/cart'
import { listRegions } from '@/lib/data/regions'
import { cn } from '@/lib/util/cn'
import Medusa from '@/modules/common/icons/medusa'
import SiteLogo from '@/ui/site-logo'
import { StoreRegion } from '@medusajs/types'
import NavAccount from '../../components/nav-account/textual'
import NavCart from '../../components/nav-cart'
import NavSearch from '../../components/nav-search/textual'
import SideMenu from '../side-menu/headless-ui/v1'

const Header = async ({ className }: { className?: string }) => {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Medusa Store'

  // const cart = await retrieveCart()
  // if (cart?.items?.length) {
  //   cart.items = await enrichLineItems(cart.items, cart.region_id!)
  // }

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

        <SiteLogo
          text={storeName}
          textClassName="text-ui-fg-subtle"
          svgComponent={<Medusa color="var(--fg-subtle)" size="22" />}
        />

        <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
          <div className="hidden h-full items-center gap-x-6 small:flex">
            <NavSearch />
            <NavAccount />
          </div>
          {/* <Suspense
            fallback={
              <LocalizedClientLink
                href="/cart"
                data-testid="nav-cart-link"
                className={cn('flex gap-2 hover:text-ui-fg-base ', className)}
              >
                Cart (0)
              </LocalizedClientLink>
            }
          >
          </Suspense> */}
          <NavCart />
        </div>
      </nav>
    </header>
  )
}

export default Header
