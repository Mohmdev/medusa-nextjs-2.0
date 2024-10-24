import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { enrichLineItems, retrieveCart } from '@/lib/data/cart'
import { getCustomer } from '@/lib/data/customer'
import { listCartShippingMethods } from '@/lib/data/fulfillment'
import { listCartPaymentMethods } from '@/lib/data/payment'

import Wrapper from '@/modules/checkout/components/payment-wrapper'
import CheckoutForm from '@/modules/checkout/templates/checkout-form'
import CheckoutSummary from '@/modules/checkout/templates/checkout-summary'
import { HttpTypes } from '@medusajs/types'

export const metadata: Metadata = {
  title: 'Checkout',
}

const fetchCart = async () => {
  const cart = await retrieveCart()
  if (!cart) {
    return notFound()
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id!)
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[]
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()
  const customer = await getCustomer()

  if (!cart) return notFound()

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? '')

  return (
    <div className="content-container grid grid-cols-1 gap-x-40 py-12 small:grid-cols-[1fr_416px]">
      <Wrapper cart={cart}>
        <CheckoutForm
          cart={cart}
          customer={customer}
          shippingMethods={shippingMethods}
          paymentMethods={paymentMethods}
        />
      </Wrapper>
      <CheckoutSummary cart={cart} />
    </div>
  )
}
