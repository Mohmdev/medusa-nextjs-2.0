"use client"

import type { StoreProductCategory } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import { Checkbox } from "@/ui/shadcn/checkbox"

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
      <div className="space-y-3">
        {categories.map((category: StoreProductCategory) => {
          const isChecked = activeCategories.includes(category.handle)
          return (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={isChecked}
                onCheckedChange={() =>
                  setQueryParams("category", category.handle)
                }
                className={cn(
                  "border-border",
                  "data-[state=checked]:bg-secondary-foreground data-[state=checked]:border-secondary-foreground"
                )}
              />
              <label
                htmlFor={category.id}
                className={cn(
                  "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                  isChecked ? "text-ui-fg-base" : "text-ui-fg-subtle"
                )}
              >
                {category.name}
              </label>
            </div>
          )
        })}
        {activeCategories.length > 0 && (
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

export default CategoryFilter
