import { enrichLineItems, retrieveCart } from '@/lib/data/cart'

const cart = await retrieveCart()
if (cart?.items?.length) {
  cart.items = await enrichLineItems(cart.items, cart.region_id!)
}

export { cart as cartItems }
