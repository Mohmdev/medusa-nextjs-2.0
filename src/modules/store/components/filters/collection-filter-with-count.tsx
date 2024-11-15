"use client"

import type { StoreCollection } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/cn"

type CollectionFilterProps = {
  search?: boolean
  "data-testid"?: string
  collections: (StoreCollection & { product_count: number })[]
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
      <ul className="txt-compact-small">
        {collections.map(
          (collection: StoreCollection & { product_count: number }) => (
            <li key={collection.id}>
              <button
                onClick={() => setQueryParams("collection", collection.handle)}
                className={cn(
                  "w-full text-left py-2 hover:text-ui-fg-base transition-colors",
                  activeCollections.includes(collection.handle)
                    ? "text-ui-fg-base font-semibold"
                    : "text-ui-fg-subtle"
                )}
              >
                {collection.title} ({collection.product_count})
              </button>
            </li>
          )
        )}
        <li>
          {activeCollections.length > 0 && (
            <button
              onClick={clearAll}
              className="txt-compact-small text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
            >
              Clear all
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}

export default CollectionFilter
