import { HttpTypes } from '@medusajs/types'

import InteractiveLink from '@/modules/common/components/interactive-link'
import ProductPreview from '@/modules/products/components/product-preview'

export default function ProductRail({
  collection,
  region,
  thumbnailSize = 'full',
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  thumbnailSize?: 'small' | 'medium' | 'large' | 'full' | 'square'
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="mb-8 flex justify-between">
        <h2 className="text-2xl font-medium leading-none">
          {collection.title}
        </h2>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 xl:grid-cols-4">
        {products &&
          (products as HttpTypes.StoreProduct[]).map(
            (product: HttpTypes.StoreProduct) => (
              <li key={product.id}>
                <ProductPreview
                  product={product}
                  region={region}
                  isFeatured
                  thumbnailSize={thumbnailSize}
                />
              </li>
            )
          )}
      </ul>
    </div>
  )
}
