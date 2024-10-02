import { Button, Heading } from '@medusajs/ui'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

const Hero = () => {
  return (
    <div className="relative h-[75vh] w-full border-b border-ui-border-base bg-ui-bg-subtle shadow-inner-overlay-md">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center small:p-32">
        <span>
          <div className="flex flex-row items-end gap-2">
            <h1 className="text-lg font-normal leading-10 text-ui-fg-base">
              Storefront UI Template
            </h1>
            <h2 className="text-xs font-bold leading-9 text-ui-fg-subtle">
              by Mohmdev
            </h2>
          </div>
          <Heading
            level="h2"
            className="text-3xl font-normal leading-10 text-ui-fg-subtle"
          >
            Powered by Medusa 2.0 and Next.js
          </Heading>
        </span>
        <a href="https://github.com/mohmdev/nextjs-medusa-2.0" target="_blank">
          <Button variant="secondary">
            View on GitHub
            <GitHubLogoIcon />
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Hero
