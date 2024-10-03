'use client'

import { Popover, Transition } from '@headlessui/react'
import { ArrowRightMini, XMark } from '@medusajs/icons'
import { Text, clx, useToggleState } from '@medusajs/ui'
import { Fragment } from 'react'

import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import ModeToggle from '@/ui/mode-toggle/toggle'
import { HttpTypes } from '@medusajs/types'
import CountrySelect from '../~sub-components/country-select'

const SideMenuItems = {
  Home: '/',
  Store: '/store',
  Search: '/search',
  Account: '/account',
  Cart: '/cart',
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <Popover className="flex h-full">
      {({ open, close }) => (
        <>
          <div className="relative flex h-full">
            <Popover.Button
              data-testid="nav-menu-button"
              className="relative flex h-full items-center transition-all duration-200 ease-out hover:text-ui-fg-base focus:outline-0 focus-visible:outline-0"
            >
              Menu
            </Popover.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-in-out duration-300"
            leave="transition ease-in duration-150"
            enterFrom="opacity-0 translate-x-[-20%]"
            enterTo="opacity-100 translate-x-0 backdrop-blur-2xl"
            leaveFrom="opacity-100 translate-x-0 backdrop-blur-2xl"
            leaveTo="opacity-0 translate-x-[-20%]"
          >
            <Popover.Panel
              className={cn(
                'z-50 flex flex-col overflow-hidden rounded-rounded shadow-elevation-card-hover',
                'bg-[rgba(3,7,18,0.5)] text-sm text-ui-fg-on-color backdrop-blur-2xl dark:bg-[rgba(23,26,34,0.5)]',
                'absolute inset-x-2 inset-y-2 m-0 p-0',
                'sm:w-1/3 sm:min-w-min 2xl:w-1/4',
                'h-[calc(100vh_-_1rem)]', // fallback
                'h-[calc(100dvh_-_1rem)]'
              )}
            >
              <div
                data-testid="nav-menu-popup"
                className="flex h-full flex-col justify-between p-6"
              >
                <div className="flex justify-end" id="xmark">
                  <button data-testid="close-menu-button" onClick={close}>
                    <XMark />
                  </button>
                </div>
                <ul className="flex flex-col items-start justify-start gap-6">
                  {Object.entries(SideMenuItems).map(([name, href]) => {
                    return (
                      <li key={name}>
                        <LocalizedClientLink
                          href={href}
                          className="text-3xl leading-10 transition-colors duration-150 ease-in hover:text-ui-fg-muted"
                          onClick={close}
                          data-testid={`${name.toLowerCase()}-link`}
                        >
                          {name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
                <div className="flex flex-col gap-y-6">
                  <div
                    className="flex justify-between"
                    onMouseEnter={toggleState.open}
                    onMouseLeave={toggleState.close}
                  >
                    {regions && (
                      <CountrySelect
                        toggleState={toggleState}
                        regions={regions}
                      />
                    )}
                    <ArrowRightMini
                      className={clx(
                        'transition-transform duration-150',
                        toggleState.state ? '-rotate-90' : ''
                      )}
                    />
                  </div>
                  <div className="flex flex-row flex-wrap items-start justify-between gap-4">
                    <Text className="txt-compact-small flex justify-between">
                      © {new Date().getFullYear()} Medusa Store. All rights
                      reserved.
                    </Text>
                    <ModeToggle size={18} />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default SideMenu
