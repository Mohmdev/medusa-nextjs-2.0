"use client"

import type { StoreCollection } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import { Checkbox } from "@/ui/shadcn/checkbox"

type CollectionFilterProps = {
  search?: boolean
  "data-testid"?: string
  collections: StoreCollection[]
}

const CollectionFilter = ({
  collections,
  "data-testid": dataTestId,
}: CollectionFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get all collection values from searchParams
  const activeCollections = searchParams.getAll("collection")

  const setQueryParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    // Remove all existing collection parameters
    params.delete(name)

    // If the collection is already selected, filter it out
    const newCollections = activeCollections.includes(value)
      ? activeCollections.filter((col) => col !== value)
      : [...activeCollections, value]

    // Add each collection as a separate parameter
    newCollections.forEach((collection) => {
      params.append(name, collection)
    })

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAll = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("collection")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="px-6 small:px-8 small:py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="txt-compact-xlarge">Collections</h3>
      </div>
      <div className="space-y-3">
        {collections.map((collection: StoreCollection) => {
          const isChecked = activeCollections.includes(collection.handle)
          return (
            <div key={collection.id} className="flex items-center space-x-2">
              <Checkbox
                id={collection.id}
                checked={isChecked}
                onCheckedChange={() =>
                  setQueryParams("collection", collection.handle)
                }
                className={cn(
                  "border-border",
                  "data-[state=checked]:bg-secondary-foreground data-[state=checked]:border-secondary-foreground"
                )}
              />
              <label
                htmlFor={collection.id}
                className={cn(
                  "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                  isChecked ? "text-ui-fg-base" : "text-ui-fg-subtle"
                )}
              >
                {collection.title}
              </label>
            </div>
          )
        })}
        {activeCollections.length > 0 && (
          <button
            onClick={clearAll}
            className="txt-compact-small text-ui-fg-subtle hover:text-ui-fg-base transition-colors pt-2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}

export default CollectionFilter
