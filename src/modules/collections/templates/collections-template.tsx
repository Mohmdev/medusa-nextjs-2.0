import { cn } from '@/lib/util/cn'
import { ScrollArea, ScrollBar } from '@/ui/shadcn/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/shadcn/tabs'

import SkeletonProductGrid from '@/modules/skeletons/templates/skeleton-product-grid'
import RefinementList from '@/modules/store/components/refinement-list'
import { SortOptions } from '@/modules/store/components/refinement-list/sort-products'
import PaginatedProducts from '@/modules/store/templates/paginated-products'
import { type HttpTypes } from '@medusajs/types'
import { Suspense } from 'react'

const CollectionsTemplate = ({
  collections,
  countryCode,
  sortBy,
  page,
}: {
  collections: HttpTypes.StoreCollection[]
  collection?: HttpTypes.StoreCollection
  sortBy?: SortOptions
  countryCode: string
  page: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || 'created_at'

  return (
    <div className="content-container flex flex-col py-6 small:flex-row small:items-start">
      <div className="w-full">
        <RefinementList sortBy={sort} />
        <div className="mb-8">
          <h1 className="text-2xl-semi">Collections</h1>
          <p>Explore our store&apos;s collections</p>
        </div>

        {/* Tabs */}
        <div className={cn('mx-auto flex w-full flex-col items-stretch gap-8')}>
          <Tabs className="flex h-fit flex-col gap-2" defaultValue="Store">
            <div className="flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <ScrollArea className="w-max overflow-x-auto">
                <TabsList
                  className={cn(
                    'relative self-center rounded-lg',
                    'flex h-fit w-max flex-row gap-1',
                    'left-0',
                    'flex-start justify-start',
                    'bg-transparent',
                    'p-0'
                  )}
                >
                  <div className="flex flex-row gap-2">
                    {collections.map((collection, index) => (
                      <TabsTrigger
                        key={index}
                        value={collection.id}
                        className={cn(
                          'h-full w-max rounded-lg px-4 py-2 md:px-8',
                          'font-medium hover:text-white',
                          'border border-border bg-ui-button-neutral shadow-lg',
                          'data-[state=active]:bg-ui-button-inverted'
                        )}
                      >
                        {collection.title}
                      </TabsTrigger>
                    ))}
                  </div>
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            {/* Tab Content */}
            {collections.map((collection, index) => (
              <TabsContent key={index} value={collection.id}>
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
              </TabsContent>
            ))}
          </Tabs>
        </div>
        {/* Tabs - End */}
      </div>
    </div>
  )
}

export default CollectionsTemplate
