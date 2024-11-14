"use client"

import { useCallback } from "react"
import type { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type CollectionFilterProps = {
  search?: boolean
  "data-testid"?: string
  collections: HttpTypes.StoreCollection[]
}

const CollectionFilter = ({
  collections,
  "data-testid": dataTestId,
}: CollectionFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCollection = searchParams.get("collection")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="px-6 small:px-8 small:py-4">
      <h3 className="txt-compact-xlarge mb-4">Collections</h3>
      <ul className="txt-compact-small">
        {collections.map((collection: HttpTypes.StoreCollection) => (
          <li key={collection.id}>
            <button
              onClick={() => setQueryParams("collection", collection.id)}
              className={`w-full text-left py-2 hover:text-ui-fg-base transition-colors ${
                activeCollection === collection.id
                  ? "text-ui-fg-base font-semibold"
                  : "text-ui-fg-subtle"
              }`}
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
