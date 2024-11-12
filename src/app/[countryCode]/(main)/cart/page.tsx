import { Metadata } from "next"
import type { HttpTypes } from "@medusajs/types"
import { enrichLineItems, retrieveCart } from "@/lib/data/cart"
import { getCustomer } from "@/lib/data/customer"
import CartTemplate from "@/modules/cart/templates"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id!)
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[]
  }

  return cart
}

export default async function Cart() {
  const cart = await fetchCart()
  const customer = await getCustomer()

  return <CartTemplate cart={cart} customer={customer} />
}
