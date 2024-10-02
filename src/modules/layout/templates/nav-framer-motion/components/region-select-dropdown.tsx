'use client'

import * as React from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { listRegions } from '@/lib/data/regions'
import { Button } from '@/ui/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuGroup,
  // DropdownMenuItem,
  // DropdownMenuPortal,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/shadcn/dropdown-menu'
import { cn } from '@/lib/util/cn'
import { updateRegion } from '@/lib/data/cart'
import { useParams, usePathname } from 'next/navigation'
import ReactCountryFlag from 'react-country-flag'
import type {
  // HttpTypes,
  StoreRegion,
} from '@medusajs/types'
import Spinner from '@/modules/common/icons/spinner'

type RegionOption = {
  country: string
  region: string
  label: string
}

const RegionSelectDropdown = ({ width = '12rem' }: { width?: string }) => {
  const [regions, setRegions] = React.useState<StoreRegion[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedRegion, setSelectedRegion] = React.useState<RegionOption | undefined>(undefined)
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const options = React.useMemo(() => {
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

  React.useEffect(() => {
    const fetchRegions = async () => {
      try {
        const fetchedRegions = await listRegions()
        setRegions(fetchedRegions)
      } catch (error) {
        console.error('Error fetching regions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRegions()
  }, [])

  React.useEffect(() => {
    if (countryCode && options) {
      const option = options?.find((o) => o?.country === countryCode)
      setSelectedRegion(option as RegionOption)
    }
  }, [options, countryCode])

  const handleSelect = (option: RegionOption) => {
    setSelectedRegion(option)
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
          disabled={loading}
          variant="outline"
          className={cn(
            'items-center justify-between font-normal hover:border-border hover:bg-border',
            'w-full min-w-max',
            '[@media(max-width:430px)]:!max-w-full'
          )}
          style={{ maxWidth: width }}
        >
          {loading ? (
            <div className="mx-auto flex flex-row items-center gap-2">
              <Spinner className="animate-spin" />
              {/* Loading regions... */}
            </div>
          ) : selectedRegion ? (
            <div className="flex items-center justify-start gap-2">
              <ReactCountryFlag
                svg
                style={{ width: '16px', height: '16px' }}
                countryCode={selectedRegion.country}
              />
              {selectedRegion.label}
            </div>
          ) : (
            'Select country...'
          )}
          {!loading && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[auto] bg-background"
        style={{ width: `${triggerWidth}px` }}
      >
        <DropdownMenuLabel className="font-normal text-secondary-foreground/60">
          Shipping to...
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        {options
          ?.filter((option): option is RegionOption => option !== undefined)
          .map((option) => (
            <DropdownMenuCheckboxItem
              key={option.country}
              checked={selectedRegion?.country === option.country}
              onCheckedChange={() => handleSelect(option)}
              className="focus:bg-border"
            >
              <div className="flex items-center">
                <ReactCountryFlag
                  svg
                  style={{
                    width: '16px',
                    height: '16px',
                  }}
                  countryCode={option.country}
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

export default RegionSelectDropdown
