import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import Thumbnail from '@/modules/products/components/thumbnail'
import type { HttpTypes } from '@medusajs/types'

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: HttpTypes.StoreProductVariant[]
  collection_handle: string | null
  collection_id: string | null
}

type SearchHitProps = {
  hit: ProductHit
}

const SearchHit = ({ hit }: SearchHitProps) => {
  return (
    <LocalizedClientLink
      key={hit.id}
      href={`/products/${hit.handle}`}
      data-testid="search-result"
      className="group flex flex-col justify-between gap-1"
    >
      <div className="hover-scale-large">
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="hover-shadow h-12 w-12 sm:h-full sm:w-full"
        />
      </div>
      <span
        className="text-[0.825rem] text-ui-fg-subtle"
        data-testid="search-result-title"
      >
        {hit.title}
      </span>
    </LocalizedClientLink>
  )
}

export default SearchHit
