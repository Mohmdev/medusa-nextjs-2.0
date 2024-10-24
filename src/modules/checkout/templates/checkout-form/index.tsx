'use client'

import Addresses from '@/modules/checkout/components/addresses'
import Payment from '@/modules/checkout/components/payment'
import Review from '@/modules/checkout/components/review'
import Shipping from '@/modules/checkout/components/shipping'
import { HttpTypes } from '@medusajs/types'

export default function CheckoutForm({
  cart,
  customer,
  shippingMethods,
  paymentMethods,
}: {
  cart: HttpTypes.StoreCart
  customer: HttpTypes.StoreCustomer | null
  shippingMethods: any
  paymentMethods: any
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-y-8">
      <div>
        <Addresses cart={cart} customer={customer} />
      </div>

      <div>
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      </div>

      <div>
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      </div>

      <div>
        <Review cart={cart} />
      </div>
    </div>
  )
}
