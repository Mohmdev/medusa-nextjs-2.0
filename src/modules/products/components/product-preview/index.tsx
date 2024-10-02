import { Text } from '@medusajs/ui'

import { getProductsById } from '@/lib/data/products'
import { getProductPrice } from '@/lib/util/get-product-price'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { HttpTypes } from '@medusajs/types'
import Thumbnail from '../thumbnail'
import PreviewPrice from './price'

export default async function ProductPreview({
  product,
  isFeatured,
  thumbnailSize = 'full',
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  thumbnailSize?: 'small' | 'medium' | 'large' | 'full' | 'square'
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      data-testid="product-wrapper"
      className="group"
    >
      {/* Thumbnail */}
      <Thumbnail
        thumbnail={product.thumbnail}
        images={product.images}
        size={thumbnailSize}
        isFeatured={isFeatured}
      />
      {/* Content */}
      <div className="txt-compact-medium mt-4 flex justify-between">
        <Text
          className="text-ui-fg-subtle transition-all duration-100 ease-linear group-hover:scale-[105%] group-hover:text-primary"
          data-testid="product-title"
        >
          {product.title}
        </Text>
        <div className="flex items-center gap-x-2">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
