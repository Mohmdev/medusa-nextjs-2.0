// import { listRegions } from '@lib/data'
import { cn } from '@/lib/util/cn'
import { Button } from '@/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/ui/shadcn/drawer'
import SiteLogo from '@/ui/site-logo'
import { PanelLeftIcon, X } from 'lucide-react'

import CountrySelect from '@/modules/layout/components/country-select/dropdown-radio'
import NavCollapsible from '@/modules/layout/components/nav-collapsible'
import SearchBar from '@/modules/layout/components/search-bar'
import ModeToggle from '@/ui/mode-toggle/toggle'
import { ScrollArea } from '@/ui/shadcn/scroll-area'
import type { HttpTypes } from '@medusajs/types'

type NavDrawerProps = {
  regions: HttpTypes.StoreRegion[] | null
  className?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
}

const NavDrawer = async ({
  regions,
  className,
  direction = 'left',
}: NavDrawerProps) => {
  return (
    <div className={cn('', className)}>
      <Drawer direction={direction}>
        <DrawerTrigger className="flex items-center">
          <PanelLeftIcon />
          <span className="sr-only">Toggle Menu</span>
        </DrawerTrigger>
        {/* Drawer Content */}
        <DrawerContent
          className={cn(
            // "grid  grid-rows-[1fr_1fr_max-content_1fr_1fr_1fr]",
            // 'bg-[linear-gradient(45deg,_#0000006e,_transparent)]',
            'max-h-[100dvh] overflow-hidden',
            'bg-white dark:bg-black',
            'max-w-screen sm:max-w-96'
          )}
        >
          <ScrollArea className="w-full h-full overflow-auto p-2 pl-3">
            <div className="relative flex flex-1 h-full m-0 max-h-[100dvh] flex-col items-start justify-between">
              <DrawerClose asChild>
                <Button
                  variant="transparent"
                  className={cn(
                    'absolute right-3 top-3 z-[1000]',
                    'h-10 w-10 rounded-full p-1.5',
                    'transition-all duration-200 ease-linear hover:text-green-400 hover:bg-transparent'
                  )}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
              {/* Header */}
              <DrawerHeader className="row-span-2 w-full mb-0 gap-0 text-left">
                <div className="mt-2 flex flex-col items-start gap-3">
                  <SiteLogo className="" />
                  {/* <DrawerDescription className="text-[0.825rem] font-normal text-secondary-foreground/70">
                    Where Fashion Meets Art
                  </DrawerDescription> */}
                  <SearchBar className="mt-3" />
                </div>
              </DrawerHeader>

              {/* Content */}
              <nav className="row-span-3 mb-auto mt-[10%] flex w-full flex-col justify-start gap-2 p-6">
                <NavCollapsible />
              </nav>

              {/* Footer */}
              <DrawerFooter className="row-span-1 flex w-full flex-col gap-3 p-4 pb-6">
                {/* <InteractiveLink href="/discounts">Seasonal Discounts</InteractiveLink> */}
                <div className="flex flex-row gap-6 items-center justify-between">
                  <CountrySelect regions={regions} />
                  <ModeToggle size={22} className="ml-auto mr-1" />
                </div>
              </DrawerFooter>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default NavDrawer
