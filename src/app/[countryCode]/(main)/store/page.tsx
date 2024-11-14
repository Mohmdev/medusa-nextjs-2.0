import { Suspense } from "react"
import { Metadata } from "next"
import { getCategoriesList } from "@/lib/data/categories"
import { getCollectionsList } from "@/lib/data/collections"
import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid"
import CategoryFilter from "@/modules/store/components/filters/category-filter"
import CollectionFilter from "@/modules/store/components/filters/collection-filter"
import PaginatedProducts from "@/modules/store/components/paginated-products"
import RefinementList from "@/modules/store/components/refinement-list"
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    category?: string
    collection?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page, category, collection } = searchParams
  const { product_categories } = await getCategoriesList()
  const { collections } = await getCollectionsList()

  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex min-h-screen flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <div className="flex flex-col items-start justify-start gap-6">
        <RefinementList sortBy={sort} />
        <CategoryFilter categories={product_categories} />
        <CollectionFilter collections={collections} />
      </div>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={params.countryCode}
            categoryId={category}
            collectionId={collection}
          />
        </Suspense>
      </div>
    </div>
  )
}
