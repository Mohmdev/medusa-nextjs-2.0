"use client"

import type { StoreCollection } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/ui/shadcn/tabs"

type CollectionTabsProps = {
  collections: StoreCollection[]
}

const CollectionTabs = ({ collections }: CollectionTabsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCollection = searchParams.get("collection")

  const setQueryParams = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (activeCollection === value) {
      params.delete("collection")
    } else {
      params.set("collection", value)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Tabs value={activeCollection || "all"} className="w-full">
      <TabsList className="w-full justify-start gap-4">
        <TabsTrigger value="all" onClick={() => setQueryParams("")}>
          All
        </TabsTrigger>
        {collections.map((collection) => (
          <TabsTrigger
            key={collection.id}
            value={collection.handle}
            onClick={() => setQueryParams(collection.handle)}
          >
            {collection.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default CollectionTabs
