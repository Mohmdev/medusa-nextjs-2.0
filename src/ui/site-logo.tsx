import { cn } from '@/lib/util/cn'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'
import Medusa from '@/modules/common/icons/medusa'

const SiteLogo = ({
  text,
  className,
  textClassName,
  svgComponent,
}: {
  text?: string
  className?: string
  textClassName?: string
  svgComponent?: React.ReactNode
}) => {
  const renderSvg = () => {
    if (svgComponent) {
      return (
        <>
          <LocalizedClientLink
            className="group-hover:*:fill-[var(--fg-muted)]"
            href="/"
          >
            {svgComponent}
          </LocalizedClientLink>
        </>
      )
    }

    return <Medusa fill="#9ca3af" className="fill-black dark:fill-white" />
  }

  return (
    <div
      data-testid="nav-store-link"
      className={cn(
        'group *:transition-colors *:duration-200 *:ease-linear',
        'flex max-w-max flex-row items-center justify-center gap-1.5',
        className
      )}
    >
      {renderSvg()}

      <LocalizedClientLink
        href="/"
        className={cn(
          'txt-compact-xlarge-plus flex h-full items-center uppercase text-secondary-foreground',
          'group-hover:text-ui-fg-muted ',
          textClassName
        )}
      >
        {text}
      </LocalizedClientLink>
    </div>
  )
}

export default SiteLogo
