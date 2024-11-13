import { Metadata } from "next"
import ProductsTemplate from "@/modules/products/templates/products-page"
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products"

export const metadata: Metadata = {
  title: "All Products",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams

  return (
    <ProductsTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
