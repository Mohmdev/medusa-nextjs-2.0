'use client'

import { useParams, usePathname } from 'next/navigation'
import * as React from 'react'
import { useEffect, useMemo } from 'react'
import ReactCountryFlag from 'react-country-flag'

import { updateRegion } from '@/lib/data/cart'
import { cn } from '@/lib/util/cn'
import { Button } from '@/ui/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/shadcn/dropdown-menu'
import type { HttpTypes } from '@medusajs/types'

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  regions: HttpTypes.StoreRegion[] | null
  width?: string
}

const CountrySelect = ({ regions, width = '12rem' }: CountrySelectProps) => {
  const [selectedCountry, setSelectedCountry] = React.useState<
    CountryOption | undefined
  >(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

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
    if (countryCode && options) {
      const option = options?.find((o) => o?.country === countryCode)
      setSelectedCountry(option as CountryOption)
    }
  }, [options, countryCode])

  const handleSelect = (option: CountryOption) => {
    setSelectedCountry(option)
    updateRegion(option.country, currentPath)
  }

  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = React.useState<number>(0)
  React.useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          className={cn(
            'items-center justify-between font-normal hover:border-border hover:bg-border',
            'w-full min-w-max gap-x-2',
            '[@media(max-width:430px)]:!max-w-full'
          )}
          style={{ maxWidth: width }}
          // style={{ width: `${triggerWidth}px` }}
          // `${triggerWidth}px`
        >
          <span>Shipping to:</span>
          {selectedCountry && (
            <span className="flex items-center gap-x-2">
              <ReactCountryFlag
                svg
                countryCode={selectedCountry.country ?? ''}
                style={{ width: '1rem', height: '1rem' }}
              />
              {selectedCountry.label}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="flex flex-1 flex-col bg-background"
        style={{ width: `${setTriggerWidth}px` }}
      >
        {/* <DropdownMenuLabel>Select Country</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        {options
          ?.filter((option): option is CountryOption => option !== undefined)
          .map((option) => (
            <DropdownMenuCheckboxItem
              key={option.country}
              checked={selectedCountry?.country === option.country}
              onCheckedChange={() => handleSelect(option)}
              className={cn('focus:bg-border')}
            >
              <div className="flex items-center">
                <ReactCountryFlag
                  svg
                  style={{
                    width: '1rem',
                    height: '1rem',
                  }}
                  countryCode={option.country ?? ''}
                  className="mr-2"
                />
                {option.label}
              </div>
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CountrySelect
