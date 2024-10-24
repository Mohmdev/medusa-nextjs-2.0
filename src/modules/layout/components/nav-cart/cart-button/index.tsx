// This index file is meant to be used to export the cart button component and make the
// usage of the cart button more flexible while simplifying it by implementing the
// variants logic here.

import type { HttpTypes } from '@medusajs/types'
import { SvgCartButton } from './svg'
import { TextualCartButton } from './textual'

const CartButton = ({
  cart: cartState,
  buttonVariant = 'textual',
}: {
  cart?: HttpTypes.StoreCart | null
  buttonVariant?: 'textual' | 'svg'
}) => {
  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <>
      {buttonVariant === 'textual' ? (
        <TextualCartButton itemsCount={totalItems} />
      ) : (
        <SvgCartButton itemsCount={totalItems} />
      )}
    </>
  )
}

export default CartButton
