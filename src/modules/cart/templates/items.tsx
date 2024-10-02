import repeat from '@/lib/util/repeat'
import { HttpTypes } from '@medusajs/types'
import { Heading, Table } from '@medusajs/ui'

import Item from '@/modules/cart/components/item'
import SkeletonLineItem from '@/modules/skeletons/components/skeleton-line-item'

type ItemsTemplateProps = {
  items?: HttpTypes.StoreCartLineItem[]
}

const ItemsTemplate = ({ items }: ItemsTemplateProps) => {
  return (
    <div>
      <div className="flex items-center pb-3">
        <Heading className="text-[2rem] leading-[2.75rem]">Cart</Heading>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="txt-medium-plus bg-transparent text-ui-fg-subtle hover:!bg-transparent">
            <Table.HeaderCell className="!pl-0">Item</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              Price
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="border-b-0">
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? '') > (b.created_at ?? '') ? -1 : 1
                })
                .map((item) => {
                  return <Item key={item.id} item={item} />
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
