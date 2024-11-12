import { Button, Heading } from "@medusajs/ui"
// import { GithubIcon } from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

const Hero = () => {
  return (
    <div className="relative h-[75vh] w-full border-b border-ui-border-base bg-ui-bg-subtle shadow-inner-overlay-md">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 text-center small:p-32 p-4">
        <span className="flex flex-row items-end gap-1.5">
          <h1 className="text-lg font-normal leading-10 text-ui-fg-base">
            Storefront UI Template
          </h1>
          <h2 className="text-xs font-medium leading-9 text-ui-fg-subtle">
            by Mohmdev
          </h2>
        </span>

        <span>
          <Heading
            level="h2"
            className="text-lg md:text-xl font-normal  text-ui-fg-subtle mb-6"
          >
            Powered by Next.js 15 and Medusa 2.0
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
