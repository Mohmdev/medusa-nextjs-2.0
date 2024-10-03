// import { listRegions } from '@lib/data'
import { cn } from '@/lib/util/cn'
import { Button } from '@/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/ui/shadcn/drawer'
import SiteLogo from '@/ui/site-logo'
import { PanelLeftIcon, X } from 'lucide-react'

import ModeToggle from '@/ui/mode-toggle/toggle'
import { ScrollArea } from '@/ui/shadcn/scroll-area'
import RegionSelectDropdown from '../sidemenu-framer-motion/components/region-select-dropdown'
import NavCollapsible from '../~sub-components/nav-collapsible'
import NavSocialLinks from '../~sub-components/nav-social-links'
import SearchBar from '../~sub-components/search-bar'

type NavDrawerProps = {
  className?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
}

const NavDrawer = async ({ className, direction = 'left' }: NavDrawerProps) => {
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
            'flex flex-col items-start justify-between',
            'max-h-[100dvh] overflow-hidden',
            'bg-[linear-gradient(45deg,_#0000006e,_transparent)]'
          )}
        >
          <ScrollArea className="w-full overflow-auto p-0 pl-1">
            <div className="relative flex h-[100dvh] flex-col items-start justify-between">
              <DrawerClose asChild>
                <Button
                  variant="transparent"
                  className="absolute right-3 top-3 z-[1000] h-6 w-6 rounded-full p-1 transition-all duration-200 ease-linear hover:text-green-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
              {/* Header */}
              <DrawerHeader className="row-span-2 mb-0 gap-0 text-left">
                <div className="mt-2 flex flex-col items-start gap-3 p-4">
                  <SiteLogo className="-ml-2" />
                  <DrawerDescription className="text-[0.825rem] font-normal text-secondary-foreground/70">
                    Where Fashion Meets Art
                  </DrawerDescription>
                  <div className="flex w-full flex-row items-center justify-between">
                    <NavSocialLinks className="-mb-1 text-secondary-foreground/70" />
                    {/* <BasicModeToggle size={20} /> */}
                  </div>
                  <SearchBar className="mt-3" />
                </div>
                {/* <Separator className="bg-[var(--border-primary)]" /> */}
              </DrawerHeader>

              {/* Content */}
              <nav className="row-span-3 mb-auto mt-0 flex w-full flex-col justify-start gap-2 p-6">
                {/* <ul className="flex flex-col gap-4"> */}
                <NavCollapsible />
              </nav>

              {/* Footer */}
              <DrawerFooter className="row-span-1 flex w-full flex-col gap-3 p-4 pb-6">
                {/* <InteractiveLink href="/discounts">
                  Seasonal Discounts
                </InteractiveLink> */}

                <ModeToggle size={22} className="ml-auto mr-1" />

                <RegionSelectDropdown width="100%" />
              </DrawerFooter>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default NavDrawer
