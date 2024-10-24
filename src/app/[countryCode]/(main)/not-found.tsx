import { Metadata } from 'next'

import InteractiveLink from '@/modules/common/components/interactive-link'

export const metadata: Metadata = {
  title: '404',
  description: 'Something went wrong',
}

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl-semi text-ui-fg-base">Page not found</h1>
      <p className="text-small-regular text-ui-fg-base">
        The page you tried to access does not exist.
      </p>
      <InteractiveLink href="/">Go to frontpage</InteractiveLink>
    </div>
  )
}
