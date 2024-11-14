"use client"

import { useCallback } from "react"
import type { StoreCollection } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/cn"

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

  const activeCollection = searchParams.get("collection")

  const setQueryParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    // If clicking the already selected collection, remove it from params
    if (activeCollection === value) {
      params.delete(name)
    } else {
      // Otherwise set the new collection
      params.set(name, value)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="px-6 small:px-8 small:py-4">
      <h3 className="txt-compact-xlarge mb-4">Collections</h3>
      <ul className="txt-compact-small">
        {collections.map((collection: StoreCollection) => (
          <li key={collection.id}>
            <button
              onClick={() => setQueryParams("collection", collection.handle)}
              className={cn(
                "w-full text-left py-2 hover:text-ui-fg-base transition-colors",
                activeCollection === collection.handle
                  ? "text-ui-fg-base font-semibold"
                  : "text-ui-fg-subtle"
              )}
            >
              {collection.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CollectionFilter
