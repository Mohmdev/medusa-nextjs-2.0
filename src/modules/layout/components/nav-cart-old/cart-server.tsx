'use server'

import { enrichLineItems, retrieveCart } from '@/lib/data/cart'
import CartDropdown from './cart-dropdown'
import type { NavCartProps } from './types'

// Mark the file as server component
// export const runtime = 'edge'

const CartServer = async ({
  className,
  buttonVariant = 'textual',
}: NavCartProps) => {
  // Do the data fetching here
  const cart = await retrieveCart()

  let enrichedCart = cart
  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    enrichedCart = { ...cart, items: enrichedItems }
  }

  return <CartDropdown cart={enrichedCart} buttonVariant={buttonVariant} />
}

export default CartServer
