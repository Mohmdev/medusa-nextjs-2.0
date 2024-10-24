import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import { ShoppingBasket } from 'lucide-react'

const SvgCartButton = ({ itemsCount }: { itemsCount: number }) => {
  return (
    <LocalizedClientLink
      className="text-secondary-foreground/90 h-max relative"
      href="/cart"
      data-testid="nav-cart-link"
    >
      <ShoppingBasket size={24} className=" -mb-px" strokeWidth={1.5} />
      <div
        className="absolute -right-2 -top-1 flex aspect-square w-[14px]  items-center justify-center rounded-full bg-green-400/90 p-0 transition-opacity"
        style={{ opacity: itemsCount === 0 ? 0 : 1 }}
      >
        <div className="flex h-full w-full items-center justify-center font-sans text-[0.625rem] font-[300] leading-[revert] text-slate-100">
          {itemsCount}
        </div>
      </div>
    </LocalizedClientLink>
  )
}

export default SvgCartButton
