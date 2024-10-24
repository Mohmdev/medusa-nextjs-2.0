'use client'

import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'

import { updateRegion } from '@/lib/data/cart'
import { StateType } from '@/lib/hooks/use-toggle-state'
import { cn } from '@/lib/util/cn'
import { HttpTypes } from '@medusajs/types'
import { useParams, usePathname } from 'next/navigation'

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

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
    <div>
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
              static
              className={cn(
                'absolute -bottom-[calc(100%-36px)] left-0 z-[900] xsmall:left-auto xsmall:right-0',
                'rounded-md bg-card drop-shadow-md',
                'no-scrollbar max-h-[442px] w-full overflow-y-scroll',
                'text-small-regular uppercase text-secondary-foreground'
              )}
            >
              {options?.map((o, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    value={o}
                    className={cn(
                      'flex cursor-pointer items-center gap-x-2 px-3 py-2',
                      'outline-none transition-colors',
                      'hover:bg-ui-bg-component-hover',
                      'focus:bg-ui-bg-component-hover focus-visible:bg-ui-bg-component-hover',
                      'active:bg-ui-bg-component-pressed',
                      'data-[disabled]:pointer-events-none data-[disabled]:text-ui-fg-disabled'
                    )}
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
    </div>
  )
}

export default CountrySelect
