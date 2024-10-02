import { cn } from '@/lib/util/cn'
import Spinner from '@/modules/common/icons/spinner'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  cn(
    "after:content-[''] after:absolute after:inset-0 after:transition-fg disabled:after:hidden",
    'relative inline-flex items-center justify-center w-fit h-fit overflow-hidden rounded-md outline-none transition-fg',
    'disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled disabled:shadow-buttons-neutral',
    'font-sans font-[400] text-[0.825rem] leading-[1.25rem]'
  ),
  {
    variants: {
      variant: {
        default: cn(
          'shadow-buttons-neutral text-ui-fg-base bg-ui-button-neutral after:button-neutral-gradient',
          'hover:bg-ui-button-neutral-hover hover:after:button-neutral-hover-gradient',
          'active:bg-ui-button-neutral-pressed active:after:button-neutral-pressed-gradient'
          // 'focus-visible:shadow-buttons-neutral-focus'
        ),
        secondary: cn(
          'text-ui-fg-base bg-green-700 shadow-buttons-neutral after:button-inverted-gradient',
          'hover:bg-primary/90 hover:after:button-inverted-hover-gradient',
          'active:bg-ui-button-inverted-pressed active:after:button-inverted-pressed-gradient'
          // 'focus-visible:!shadow-buttons-inverted-focus'
          // 'after:button-inverted-gradient'
          // 'after:button-inverted-hover-gradient'
        ),
        transparent: cn(
          'after:hidden',
          'text-ui-fg-base bg-ui-button-transparent',
          'hover:bg-ui-button-transparent-hover',
          'active:bg-ui-button-transparent-pressed',
          'focus-visible:shadow-buttons-neutral-focus focus-visible:bg-ui-bg-base',
          'disabled:!bg-transparent disabled:!shadow-none'
        ),
        danger: cn(
          'shadow-buttons-colored shadow-buttons-danger text-ui-fg-on-color bg-ui-button-danger after:button-danger-gradient',
          'hover:bg-ui-button-danger-hover hover:after:button-danger-hover-gradient',
          'active:bg-ui-button-danger-pressed active:after:button-danger-pressed-gradient',
          'focus-visible:shadow-buttons-danger-focus'
        ),
        unstyled: cn(''),
      },
      size: {
        content: 'w-max h-max',
        icon: 'min-w-6 p-1.5 aspect-square',
        small: 'px-2 py-1 gap-x-1.5',
        base: 'px-4 py-1.5 gap-x-1.5',
        large: 'px-4 py-2 gap-x-1.5',
        xlarge: 'px-6 py-3 gap-x-1.5',
        wide: 'px-8 py-1.5 gap-x-1.5',
        full: 'px-8 py-2 w-full gap-x-1.5',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      disabled,
      isLoading,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button'

    /**
     * In the case of a button where asChild is true, and isLoading is true, we ensure that
     * only on element is passed as a child to the Slot component. This is because the Slot
     * component only accepts a single child.
     */
    const renderInner = () => {
      if (isLoading) {
        return (
          <span className="pointer-events-none">
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center rounded-md bg-ui-bg-disabled'
              )}
            >
              <Spinner className="animate-spin" />
            </div>
            {children}
          </span>
        )
      }

      return children
    }

    return (
      <Component
        ref={ref}
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
      >
        {renderInner()}
      </Component>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
