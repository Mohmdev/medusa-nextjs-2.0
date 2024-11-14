"use client"

import { useCallback } from "react"
import type { StoreProductCategory } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/cn"

type CategoryFilterProps = {
  search?: boolean
  "data-testid"?: string
  categories: StoreProductCategory[]
}

const CategoryFilter = ({
  categories,
  "data-testid": dataTestId,
}: CategoryFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get("category")

  const setQueryParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    // If clicking the already selected category, remove it from params
    if (activeCategory === value) {
      params.delete(name)
    } else {
      // Otherwise set the new category
      params.set(name, value)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="px-6 small:px-8 small:py-4">
      <h3 className="txt-compact-xlarge mb-4">Categories</h3>
      <ul className="txt-compact-small">
        {categories.map((category: StoreProductCategory) => (
          <li key={category.id}>
            <button
              onClick={() => setQueryParams("category", category.handle)}
              className={cn(
                "w-full text-left py-2 hover:text-ui-fg-base transition-colors",
                activeCategory === category.handle
                  ? "text-ui-fg-base font-semibold"
                  : "text-ui-fg-subtle"
              )}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryFilter
