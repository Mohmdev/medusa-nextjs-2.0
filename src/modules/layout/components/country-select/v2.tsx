'use client'

import { Listbox, Transition } from '@headlessui/react'
import { useParams, usePathname } from 'next/navigation'
import { Fragment, useEffect, useMemo, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
//
import { updateRegion } from '@/lib/data/cart'
import type { HttpTypes } from '@medusajs/types'
// import { StateType } from '@/lib/hooks/use-toggle-state'
import { cn } from '@/lib/util/cn'
import { ArrowRightMini } from '@medusajs/icons'
import { useToggleState } from '@medusajs/ui'

type CountryOption = {
  country: string
  region: string
  label: string
}

const storeRegions: HttpTypes.StoreRegion[] = []

const CountrySelect = ({
  regions = storeRegions,
}: {
  // toggleState: StateType
  regions?: HttpTypes.StoreRegion[]
}) => {
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)

  // const toggleState = useToggleState()
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]
  const toggleState = useToggleState()
  const { state, close } = toggleState

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? '').localeCompare(b?.label ?? ''))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
    close()
  }

  return (
    <div
      className="flex justify-between"
      onMouseEnter={toggleState.open}
      onMouseLeave={toggleState.close}
    >
      {regions && (
        <Listbox
          as="span"
          onChange={handleChange}
          defaultValue={
            countryCode
              ? options?.find((o) => o?.country === countryCode)
              : undefined
          }
        >
          <Listbox.Button className="w-full py-1">
            <div className="txt-compact-small flex items-start gap-x-2">
              <span>Shipping to:</span>
              {current && (
                <span className="txt-compact-small flex items-center gap-x-2">
                  <ReactCountryFlag
                    svg
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                    countryCode={current.country ?? ''}
                  />
                  {current.label}
                </span>
              )}
            </div>
          </Listbox.Button>
          <div className="relative flex w-full min-w-[320px]">
            <Transition
              show={state}
              as={Fragment}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="text-small-regular no-scrollbar absolute -bottom-[calc(100%-36px)] left-0 z-[900] max-h-[442px] w-full overflow-y-scroll rounded-rounded uppercase text-black drop-shadow-[0_10px_50px_rgba(96,96,96,0.25)] dark:bg-ui-bg-field-hover xsmall:left-auto xsmall:right-0"
                static
              >
                {options?.map((o, index) => {
                  return (
                    <Listbox.Option
                      key={index}
                      value={o}
                      className="flex cursor-pointer items-center gap-x-2 px-3 py-2 hover:bg-gray-200 dark:text-ui-fg-subtle dark:hover:bg-ui-bg-switch-off-hover"
                    >
                      <ReactCountryFlag
                        svg
                        style={{
                          width: '16px',
                          height: '16px',
                        }}
                        countryCode={o?.country ?? ''}
                      />{' '}
                      {o?.label}
                    </Listbox.Option>
                  )
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
      <ArrowRightMini
        className={cn(
          'transition-transform duration-150',
          toggleState.state ? '-rotate-90' : ''
        )}
      />
    </div>
  )
}

export default CountrySelect
