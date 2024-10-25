import { getCollectionsList } from '@/lib/data/collections'
import { listRegions } from '@/lib/data/regions'
import CollectionsTemplate from '@/modules/collections/templates/collections-template'
import { SortOptions } from '@/modules/store/components/refinement-list/sort-products'
import { StoreCollection, StoreRegion } from '@medusajs/types'
import { Metadata } from 'next'

type Props = {
  params: { handle: string; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
  }
}

export async function generateStaticParams() {
  const { collections } = await getCollectionsList()

  if (!collections) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
    .flat()

  return staticParams
}

export const metadata: Metadata = {
  title: 'Collections | Medusa Store',
  description: 'Browse all collections available in the store.',
}

export default async function CollectionsPage({ params, searchParams }: Props) {
  const { collections } = await getCollectionsList()
  const { sortBy } = searchParams

  if (!collections) {
    return <p>No collections found.</p>
  }

  return (
    <>
      <CollectionsTemplate
        collections={collections}
        page={params.handle}
        sortBy={sortBy}
        countryCode={params.countryCode}
      />
    </>
  )
}
