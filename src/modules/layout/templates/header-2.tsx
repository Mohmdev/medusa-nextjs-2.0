import { cn } from '@/lib/util/cn'
import Medusa from '@/modules/common/icons/medusa'
import SiteLogo from '@/ui/site-logo'
import SideMenu from '../component-templates/sidemenu-framer-motion'
import NavAccount from '../component-templates/~sub-components/nav-account/svg'
import NavCart from '../component-templates/~sub-components/nav-cart'
import NavSearch from '../component-templates/~sub-components/nav-search/svg'
// import { StoreRegion } from '@medusajs/types'

export default async function Header({ className }: { className?: string }) {
  // const regions = await listRegions().then((regions: StoreRegion[]) => regions)
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
      <section className="content-container text-small-regular txt-xsmall-plus relative flex h-full w-full items-center justify-between text-ui-fg-subtle">
        <SiteLogo
          text={storeName}
          textClassName=""
          className="z-[51]"
          svgComponent={
            <Medusa
              className="*:fill-secondary-foreground group-hover:*:fill-[var(--ui-subtle)]"
              size="22"
            />
          }
        />

        <div
          data-testid="nav-actions"
          className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6"
        >
          {/* <NavSearch />
          <NavAccount />

          <NavCart buttonVariant="svg" /> */}
        </div>

        <div
          data-testid="nav-menu"
          className="flex h-full flex-1 basis-0 items-center justify-end gap-4"
        >
          <div
            className={cn(
              'z-50',
              'flex h-full flex-1 basis-0 items-center justify-end gap-3'
            )}
          >
            <NavSearch />
            <NavAccount />
            <NavCart buttonVariant="svg" />
          </div>
          <SideMenu className="z-40" />
        </div>
      </section>
    </header>
  )
}
