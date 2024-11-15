"use client"

import type { StoreProductCategory } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/cn"

type CategoryFilterProps = {
  search?: boolean
  "data-testid"?: string
  categories: (StoreProductCategory & { product_count: number })[]
}

const CategoryFilterWithCount = ({
  categories,
  "data-testid": dataTestId,
}: CategoryFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get all category values from searchParams
  const activeCategories = searchParams.getAll("category")

  const setQueryParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    // Remove all existing category parameters
    params.delete(name)

    // If the category is already selected, filter it out
    const newCategories = activeCategories.includes(value)
      ? activeCategories.filter((cat) => cat !== value)
      : [...activeCategories, value]

    // Add each category as a separate parameter
    newCategories.forEach((category) => {
      params.append(name, category)
    })

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAll = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("category")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="px-6 small:px-8 small:py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="txt-compact-xlarge">Categories</h3>
      </div>
      <ul className="txt-compact-small">
        {categories.map(
          (category: StoreProductCategory & { product_count: number }) => (
            <li key={category.id}>
              <button
                onClick={() => setQueryParams("category", category.handle)}
                className={cn(
                  "w-full text-left py-2 hover:text-ui-fg-base transition-colors",
                  activeCategories.includes(category.handle)
                    ? "text-ui-fg-base font-semibold"
                    : "text-ui-fg-subtle"
                )}
              >
                {category.name} ({category.product_count})
              </button>
            </li>
          )
        )}
        <li>
          {activeCategories.length > 0 && (
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

export default CategoryFilterWithCount
