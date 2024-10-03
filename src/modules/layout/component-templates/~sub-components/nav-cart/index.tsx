import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { Suspense } from 'react'

import { enrichLineItems, retrieveCart } from '@/lib/data/cart'
import { cn } from '@/lib/util/cn'
import CartDropdown from './cart-dropdown'

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems
  }

  return cart
}

const NavCart = async ({
  className,
  buttonVariant = 'textual', // Default to textual version
}: {
  className?: string
  buttonVariant?: 'textual' | 'svg'
}) => {
  const cart = await fetchCart()

  return (
    <Suspense
      fallback={
        <LocalizedClientLink
          href="/cart"
          data-testid="nav-cart-link"
          className={cn('flex gap-2 hover:text-ui-fg-base ', className)}
        >
          Cart (0)
        </LocalizedClientLink>
      }
    >
      <CartDropdown cart={cart} buttonVariant={buttonVariant} />
    </Suspense>
  )
}

export default NavCart
