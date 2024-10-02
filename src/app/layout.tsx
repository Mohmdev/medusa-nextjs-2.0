import { getBaseURL } from "@/lib/util/env"
import { Metadata } from "next"
import '@/styles/base.css'
import '@/styles/utilities.css'
import '@/styles/components.css'
import '@/styles/custom.css'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
