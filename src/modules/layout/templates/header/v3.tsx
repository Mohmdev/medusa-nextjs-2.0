import { listRegions } from '@/lib/data/regions'
import { cn } from '@/lib/util/cn'
import Medusa from '@/modules/common/icons/medusa'
import SiteLogo from '@/ui/site-logo'
import type { HttpTypes } from '@medusajs/types'
import NavAccount from '../../components/nav-account/svg'
import NavCart from '../../components/nav-cart'
import NavDropdown from '../../components/nav-dropdown'
import NavSearch from '../../components/nav-search/svg'
// import SideMenu from '../side-menu/framer-motion'
import SideMenu from '../side-menu/shadcn'

export default async function Header({ className }: { className?: string }) {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Medusa Store'
  const regions: HttpTypes.StoreRegion[] | null = await listRegions().then(
    (regions) => regions
  )

  return (
    <header
      className={cn(
        'group sticky inset-x-0 top-0 z-50',
        'mx-auto h-16 w-full duration-200',
        'border-b border-border bg-background',
        className
      )}
    >
      <section
        className={cn(
          'content-container relative',
          'grid h-full w-full gap-4',
          'grid-cols-[1fr,auto,1fr]',
          'nav:grid-cols-[max-content,auto,1fr]',
          'text-ui-fg-subtle text-small-regular txt-xsmall-plus'
        )}
      >
        <SiteLogo
          className="z-50"
          svgComponent={
            <Medusa
              className="*:fill-secondary-foreground/90 hover:*:fill-secondary-subtle *:duration-150 *:ease-linear"
              size="22"
            />
          }
        />

        <div
          data-testid="nav-actions"
          className={cn(
            'flex flex-1 basis-0 items-center justify-center gap-x-6 ',
            'w-max h-full',
            // 'bg-red-500',
            ''
          )}
        >
          <NavDropdown className="hidden nav:flex text-secondary-foreground/90 hover:*:text-secondary-subtle" />
        </div>

        <div
          data-testid="nav-menu"
          className="flex h-full flex-1 basis-0 items-center justify-end gap-5"
        >
          <div
            className={cn(
              'z-50',
              'flex h-full flex-1 basis-0 items-center justify-end gap-3 -mt-0.5'
            )}
          >
            <NavSearch />
            <NavAccount />
            <NavCart buttonVariant="svg" />
          </div>
          <SideMenu direction="right" regions={regions} className="z-40" />
        </div>
      </section>
    </header>
  )
}
