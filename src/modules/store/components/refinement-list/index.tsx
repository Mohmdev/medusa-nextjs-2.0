"use client"

import { useCallback } from "react"
import type { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
  categories: HttpTypes.StoreProductCategory[]
}

const RefinementList = ({
  sortBy,
  categories,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get("category")

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
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <SortProducts
        sortBy={sortBy}
        setQueryParams={setQueryParams}
        data-testid={dataTestId}
      />
      <div className="px-6 small:px-8 small:py-4">
        <h3 className="txt-compact-xlarge mb-4">Categories</h3>
        <ul className="txt-compact-small">
          {categories.map((cat: HttpTypes.StoreProductCategory) => (
            <li key={cat.id}>
              <button
                onClick={() => setQueryParams("category", cat.id)}
                className={`w-full text-left py-2 hover:text-ui-fg-base transition-colors ${
                  activeCategory === cat.id
                    ? "text-ui-fg-base font-semibold"
                    : "text-ui-fg-subtle"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RefinementList
