import { getCategoryByHandle } from "@/lib/data/categories"
import { getCollectionByHandle } from "@/lib/data/collections"
import { getProductsListWithSort } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import ProductPreview from "@/modules/products/components/product-preview"
import { Pagination } from "@/modules/store/components/pagination"
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

type PaginatedProductsProps = {
  countryCode: string
  sortBy?: SortOptions
  page: number
  productsIds?: string[]
  categoryId?: string
  categoryHandle?: string | string[]
  collectionId?: string
  collectionHandle?: string | string[]
}

const PaginatedProducts = async ({
  countryCode,
  sortBy,
  page,
  productsIds,
  categoryId,
  categoryHandle,
  collectionId,
  collectionHandle,
}: PaginatedProductsProps) => {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (collectionHandle) {
    const handles = Array.isArray(collectionHandle)
      ? collectionHandle
      : [collectionHandle]
    const collections = await Promise.all(
      handles.map((handle) => getCollectionByHandle(handle))
    )
    const validCollections = collections.filter(Boolean)
    if (validCollections.length) {
      queryParams["collection_id"] = validCollections.map((col) => col.id)
    }
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (categoryHandle) {
    const handles = Array.isArray(categoryHandle)
      ? categoryHandle
      : [categoryHandle]
    const { product_categories } = await getCategoryByHandle(handles)
    if (product_categories?.length) {
      queryParams["category_id"] = product_categories.map((cat) => cat.id)
    }
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid w-full grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}

export default PaginatedProducts
