import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { Suspense } from 'react'
import CartButton from './cart-button'

const NavCart = () => {
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
      <CartButton />
    </Suspense>
  )
}

export default NavCart
