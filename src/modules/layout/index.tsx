import React from "react"
import type { StoreRegion } from "@medusajs/types"
import { getCategoriesList } from "@/lib/data/categories"
import { getCollectionsList } from "@/lib/data/collections"
import { listRegions } from "@/lib/data/regions"
import Footer from "./templates/footer/footer-2"
import Header from "./templates/header/header-1"

interface LayoutTemplateProps {
  children: React.ReactNode
}

const LayoutTemplate = async ({ children }: LayoutTemplateProps) => {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <>
      <Header
        regions={regions}
        collections={collections}
        product_categories={product_categories}
      />
      {children}
      <Footer
        regions={regions}
        collections={collections}
        product_categories={product_categories}
      />
    </>
  )
}

export default LayoutTemplate
