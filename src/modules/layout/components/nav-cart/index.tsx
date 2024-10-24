import { enrichLineItems, retrieveCart } from '@/lib/data/cart'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { Suspense } from 'react'
import CartDropdown from './cart-dropdown/v1'

const NavCart = async ({
  buttonVariant = 'textual',
}: {
  buttonVariant?: 'textual' | 'svg'
}) => {
  const cartItems = await fetchCartItems()
  return (
    <Suspense
      fallback={
        <LocalizedClientLink
          className="hover:text-ui-fg-base flex gap-2"
          href="/cart"
          data-testid="nav-cart-link"
        >
          Cart (0)
        </LocalizedClientLink>
      }
    >
      <CartDropdown cart={cartItems} buttonVariant={buttonVariant} />
    </Suspense>
  )
}

const fetchCartItems = async () => {
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

export default NavCart
