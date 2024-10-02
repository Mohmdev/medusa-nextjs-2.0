import { cn } from '@/lib/util/cn'
import { Text } from '@medusajs/ui'
import { VariantPrice } from 'types/global'

export default async function PreviewPrice({
  price,
  className,
}: {
  price: VariantPrice
  className?: string
}) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === 'sale' && (
        <Text
          className={cn('text-ui-fg-muted line-through', className)}
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={cn(
          'text-ui-fg-muted',
          {
            'text-ui-fg-interactive': price.price_type === 'sale',
          },
          className
        )}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  )
}
