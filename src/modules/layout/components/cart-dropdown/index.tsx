"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { HttpTypes } from "@medusajs/types"
import { XIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import { convertToLocale } from "@/lib/utils/money"
import DeleteButton from "@/modules/common/components/delete-button"
import LineItemOptions from "@/modules/common/components/line-item-options"
import LineItemPrice from "@/modules/common/components/line-item-price"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Thumbnail from "@/modules/products/components/thumbnail"
import { Button } from "@/ui/button"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  const toggle = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    setCartDropdownOpen(!cartDropdownOpen)
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
  }, [totalItems, itemRef.current])

  return (
    <div
      className="z-50 h-full"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <div
            className="hover:text-ui-fg-base cursor-pointer"
            data-testid="nav-cart-link"
            onClick={(e) => {
              e.preventDefault()
              toggle()
            }}
          >
            {`Cart (${totalItems})`}
          </div>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            // static
            data-testid="nav-cart-dropdown"
            anchor={{
              to: "bottom end",
              gap: ".5rem",
              padding: ".5rem",
            }}
            className={cn(
              "flex flex-col z-50",
              "px-4 py-6 gap-4",
              "w-full md:w-[420px]",
              "rounded-sm border bg-card border-border text-ui-fg-base",
              "shadow-lg md:shadow-md",
              "!shadow-slate-700/15"
            )}
          >
            <div className="flex flex-row justify-between items-center gap-4  -mt-3 mb-1">
              <h3 className="text-base-semi font-normal text-center">
                Your Shopping Cart
              </h3>
              <button
                className="text-ui-fg-base"
                onClick={close}
                data-testid="close-cart-dropdown"
              >
                <XIcon size={16} />
              </button>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.variant?.product?.handle}`}
                          // className="w-24"
                        >
                          <Thumbnail
                            thumbnail={item.variant?.product?.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          {/*  */}
                          <div className="flex flex-row flex-wrap items-start justify-between">
                            {/* Info */}
                            <div className="flex flex-col gap-1 overflow-ellipsis whitespace-nowrap mr-4 w-max max-w-[180px]">
                              <h3 className="overflow-hidden text-base-regular text-ellipsis text-[.9375rem]">
                                <LocalizedClientLink
                                  href={`/products/${item.variant?.product?.handle}`}
                                  data-testid="product-link"
                                >
                                  {item.product_title}
                                </LocalizedClientLink>
                              </h3>
                              <span className="flex flex-row items-end">
                                <span
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                  className="text-[.75rem] font-normal leading-[18px] text-ui-fg-muted"
                                >
                                  {item.quantity} &times;&nbsp;
                                </span>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                  className="text-[.875rem] font-normal leading-[20px] "
                                />
                              </span>
                            </div>
                            {/* Price */}
                            <div className="flex justify-end">
                              <LineItemPrice
                                item={item}
                                style="tight"
                                className="text-[.9375rem]"
                              />
                            </div>
                          </div>
                          {/*  */}
                          <DeleteButton
                            id={item.id}
                            className="my-2 self-end"
                            data-testid="cart-item-remove-button"
                          >
                            {/* Remove */}
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ui-fg-base">
                      Subtotal{" "}
                      <span className="font-normal">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-large-semi"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      variant="default"
                      size="large"
                      className="w-full"
                      data-testid="go-to-cart-button"
                    >
                      Go to cart
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center py-16 gap-y-4">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-gray-900 rounded-full text-small-regular">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close}>Explore products</Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
