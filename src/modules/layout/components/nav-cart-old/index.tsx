// import { enrichLineItems, retrieveCart } from '@/lib/data/cart'
// import CartDropdown from './cart-dropdown'

// const fetchCart = async () => {
//   const cart = await retrieveCart()

//   if (!cart) {
//     return null
//   }

//   if (cart?.items?.length) {
//     const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
//     cart.items = enrichedItems
//   }

//   return cart
// }

// const NavCart = async ({
//   className,
//   buttonVariant = 'textual', // Default to textual version
// }: {
//   className?: string
//   buttonVariant?: 'textual' | 'svg'
// }) => {
//   const cart = await fetchCart()

//   return <CartDropdown cart={cart} buttonVariant={buttonVariant} />
// }

// export default NavCart

import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import type { HttpTypes } from '@medusajs/types'
import CartDropdown from './cart-dropdown'

const NavCart = ({
  className,
  buttonVariant = 'textual', // Default to textual version
  cart,
}: {
  className?: string
  buttonVariant?: 'textual' | 'svg'
  cart?: HttpTypes.StoreCart | null
}) => {
  return (
    <LocalizedClientLink
      href="/cart"
      data-testid="nav-cart-link"
      className={cn('flex gap-2 hover:text-ui-fg-base ', className)}
    >
      <CartDropdown cart={cart} buttonVariant={buttonVariant} />
    </LocalizedClientLink>
  )
}

export default NavCart
