import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { cn } from "@/lib/utils/cn"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
  className?: string
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
  className,
}: LineItemOptionsProps) => {
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className={cn(
        "inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis",
        className
      )}
    >
      {variant?.title}
    </Text>
  )
}

export default LineItemOptions
