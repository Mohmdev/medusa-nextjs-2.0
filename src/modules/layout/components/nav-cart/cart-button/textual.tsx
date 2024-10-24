import LocalizedClientLink from '@/modules/common/components/localized-client-link'

const TextualCartButton = ({ itemsCount }: { itemsCount: number }) => {
  return (
    <LocalizedClientLink
      className="text-nowrap hover:text-ui-fg-base"
      href="/cart"
      data-testid="nav-cart-link"
    >
      {`Cart (${itemsCount})`}
    </LocalizedClientLink>
  )
}

export { TextualCartButton }
