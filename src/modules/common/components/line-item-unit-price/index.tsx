import { getPricesForVariant } from '@/lib/util/get-product-price'
import { HttpTypes } from '@medusajs/types'
import { clx } from '@medusajs/ui'

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: 'default' | 'tight'
}

const LineItemUnitPrice = ({
  item,
  style = 'default',
}: LineItemUnitPriceProps) => {
  const {
    original_price,
    calculated_price,
    original_price_number,
    calculated_price_number,
    percentage_diff,
  } = getPricesForVariant(item.variant) ?? {}
  const hasReducedPrice = calculated_price_number < original_price_number

  return (
    <div className="flex h-full flex-col justify-center text-ui-fg-muted">
      {hasReducedPrice && (
        <>
          <p>
            {style === 'default' && (
              <span className="text-ui-fg-muted">Original: </span>
            )}
            <span
              className="line-through"
              data-testid="product-unit-original-price"
            >
              {original_price}
            </span>
          </p>
          {style === 'default' && (
            <span className="text-ui-fg-interactive">-{percentage_diff}%</span>
          )}
        </>
      )}
      <span
        className={clx('text-base-regular', {
          'text-ui-fg-interactive': hasReducedPrice,
        })}
        data-testid="product-unit-price"
      >
        {calculated_price}
      </span>
    </div>
  )
}

export default LineItemUnitPrice
