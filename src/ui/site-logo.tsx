import Medusa from '@/modules/common/icons/medusa'
import { cn } from '@/lib/util/cn'
import Image from 'next/image'
import LocalizedClientLink from '@/modules/common/components/localized-client-link'

export type SiteLogoProps = {
  text?: string
  textClassName?: string
  svgUrl?: string
  svgComponent?: React.ReactNode
  localized?: boolean
}

const SiteLogo = ({
  text = 'Medusa Store',
  textClassName,
  svgUrl,
  svgComponent,
  localized = false,
}: SiteLogoProps) => {
  const width = 30
  const height = 30

  const renderSvg = () => {
    if (svgUrl) {
      return <Image src={svgUrl} alt="Site logo" className="" width={width} height={height} /> // Renders SVG from an external URL
    }

    if (svgComponent) {
      return <>{svgComponent}</>
    }

    return <Medusa fill="#9ca3af" className="fill-[#9ca3af]" />
  }

  const content = (
    <div className="flex max-w-max flex-row items-center justify-center gap-2">
      {renderSvg()}
      <span
        className={cn('txt-compact-xlarge-plus uppercase hover:text-ui-fg-base', textClassName)}
      >
        {text}
      </span>
    </div>
  )

  return localized ? (
    <LocalizedClientLink href="/" data-testid="nav-store-link" className="flex h-full items-center">
      {content}
    </LocalizedClientLink>
  ) : (
    content
  )
}

export default SiteLogo
