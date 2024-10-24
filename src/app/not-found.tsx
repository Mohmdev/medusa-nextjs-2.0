import { ArrowUpRightMini } from '@medusajs/icons'
import { Text } from '@medusajs/ui'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404',
  description: 'Something went wrong',
}

export default function NotFound() {
  return (
    <div className="row-span-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl-semi text-ui-fg-base">Page not found</h1>
      <p className="text-small-regular text-ui-fg-base">
        The page you tried to access does not exist.
      </p>
      <Link className="group flex items-center gap-x-1" href="/">
        <Text className="text-ui-fg-interactive">Go to frontpage</Text>
        <ArrowUpRightMini
          className="duration-150 ease-in-out group-hover:rotate-45"
          color="var(--fg-interactive)"
        />
      </Link>
    </div>
  )
}
