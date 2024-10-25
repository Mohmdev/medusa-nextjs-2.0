'use client'

import { updateRegion } from '@/lib/data/cart' // Added missing import
import { Button } from '@/ui/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/shadcn/dropdown-menu'
import type { HttpTypes } from '@medusajs/types'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'

type CountryOption = {
  country: string
  region: string
  label: string
}

const CountrySelect = ({
  regions,
}: {
  regions: HttpTypes.StoreRegion[] | null
}) => {
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined)
  const [open, setOpen] = useState(false)

  const options = useMemo(() => {
    return (
      regions
        ?.map((r) => {
          return r.countries?.map((c) => ({
            country: c.iso_2 || '',
            region: r.id,
            label: c.display_name || '',
          }))
        })
        .flat()
        .filter(
          (option): option is CountryOption =>
            option !== undefined &&
            typeof option.country === 'string' &&
            option.country !== '' &&
            typeof option.label === 'string' &&
            option.label !== ''
        )
        .sort((a, b) => a.label.localeCompare(b.label)) || []
    )
  }, [regions])

  useEffect(() => {
    if (countryCode && options.length > 0) {
      const option = options.find((o) => o.country === countryCode)
      if (option) {
        setCurrent(option)
      }
    }
  }, [options, countryCode])

  const handleChange = (country: string) => {
    const option = options.find((opt) => opt.country === country)
    if (option) {
      updateRegion(option.country, currentPath)
      setCurrent(option)
      setOpen(false)
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-max py-1 px-3 hover:bg-border/50">
          {current && (
            <span className="flex items-center gap-x-2">
              <ReactCountryFlag
                svg
                countryCode={current.country}
                style={{ width: '1rem', height: '1rem' }}
              />
              {/* {current.label} */}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-max p-1 bg-background/40 backdrop-blur-lg border"
      >
        <DropdownMenuLabel>Shipping to...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={current?.country}
          onValueChange={handleChange}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option.country}
              value={option.country}
              className="focus:bg-border flex-row"
            >
              <div className="flex items-center gap-x-2">
                <ReactCountryFlag
                  svg
                  countryCode={option.country}
                  style={{ width: '1rem', height: '1rem' }}
                />
                {option.label}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CountrySelect
