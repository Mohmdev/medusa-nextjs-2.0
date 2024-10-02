import { Metadata } from 'next'

import { getBaseURL } from '@/lib/util/env'
import LayoutTemplate from '@/modules/layout'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function PageLayout(props: { children: React.ReactNode }) {
  return <LayoutTemplate>{props.children}</LayoutTemplate>
}
