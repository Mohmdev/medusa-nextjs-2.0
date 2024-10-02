import { Suspense } from 'react'

import SkeletonProductGrid from '@/modules/skeletons/templates/skeleton-product-grid'
import RefinementList from '@/modules/store/components/refinement-list'
import { SortOptions } from '@/modules/store/components/refinement-list/sort-products'
import PaginatedProducts from '@/modules/store/templates/paginated-products'
import { HttpTypes } from '@medusajs/types'

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || 'created_at'

  return (
    <div className="content-container flex flex-col py-6 small:flex-row small:items-start">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1>{collection.title}</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
            productsPerPage={8}
          />
        </Suspense>
      </div>
    </div>
  )
}
