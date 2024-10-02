import React from 'react'
import { StoreCollection } from '@medusajs/types'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'

type CollectionsTemplateProps = {
  collections: StoreCollection[]
  countryCode: string
}

const CollectionsTemplate: React.FC<CollectionsTemplateProps> = ({ collections }) => {
  return (
    <div className="content-container flex flex-col py-6 small:flex-row small:items-start">
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1>Collections</h1>
        </div>
        <ul>
          {collections.map((collection) => (
            <li key={collection.id}>
              <LocalizedClientLink href={`/collections/${collection.handle}`}>
                {collection.title}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CollectionsTemplate
