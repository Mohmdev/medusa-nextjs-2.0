import type React from "react"
import { Metadata } from "next"
import { getBaseURL } from "@/lib/utils/env"
import "../styles/base.css"
import "../styles/components.css"
import "../styles/custom.css"
import "../styles/utilities.css"

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
