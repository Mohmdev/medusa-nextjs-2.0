import Divider from '@/modules/common/components/divider'
import { HttpTypes } from '@medusajs/types'
import EmptyCartMessage from '../components/empty-cart-message'
import SignInPrompt from '../components/sign-in-prompt'
import ItemsTemplate from './items'
import Summary from './summary'

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-12">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 gap-x-40 small:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-y-6 py-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate items={cart?.items} />
            </div>
            <div className="relative">
              <div className="sticky top-12 flex flex-col gap-y-8">
                {cart && cart.region && (
                  <>
                    <div className="py-6">
                      <Summary cart={cart as any} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
